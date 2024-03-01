import HTTP_CODE from "../constants/httpResponseCode.js";
import GoogleDriveService from "../helper/googleDriverService.js";
import { handleReturn } from "../helper/handleReturn.js";
import helperApp from "../helper/helper.js";
import nodeMailerLib from "../helper/nodemailer.js";
import userRepo from "../repositories/auth.repo.js";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
const login = async (data) => {
  console.log("login is RUNNING");
  try {
    const { email, password } = data;
    const user = await userRepo.getUserByCondition({ status: 2, email: email });
    //kiem tra ton tai
    if (!user) {
      return handleReturn(true, HTTP_CODE.notFound, "Tài khoản không tồn tại");
    }
    //kiem tra mat khau
    if (!(await helperApp.comparePassWordMD5(password, user.password))) {
      return handleReturn(true, HTTP_CODE.badRequest, "Mật khẩu không đúng");
    }

    //tao token
    const token = await helperApp.generateJwtToken({ ...user }, 30 * 60 * 1000);
    //chuyển về json rồi mới xóa được khỏi obj
    const userCopy = JSON.parse(JSON.stringify(user));
    delete userCopy.password;
    //xoa bo truong password de khong tra ve
    console.log(userCopy);
    return {
      code: HTTP_CODE.success,
      data: {
        token,
        user: userCopy,
      },
      message: "Đăng nhập thành công",
    };
  } catch (error) {
    return handleReturn(true, HTTP_CODE?.errorServer, error?.message);
  }
};

const signup = async (data, file) => {
  console.log("file ", file);
  console.log("sign up RUNNING");
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = "https://developers.google.com/oauthplayground";
  const refreshToken = process.env.REFRESH_TOKEN;
  const driveService = new GoogleDriveService(
    clientId,
    clientSecret,
    redirectUri,
    refreshToken
  );
  try {
    const { email, password, fullName } = data;
    // verify data
    if (!email || !password || !fullName) {
      return handleReturn(true, HTTP_CODE.badRequest, "Nhập đủ thông tin");
    }
    const user = await userRepo.getUserByCondition({ email, status: 2 });
    if (user) {
      return handleReturn(true, HTTP_CODE.badRequest, "Người dùng đã tồn tại");
    }
    const oldUser = await userRepo.getUserByCondition({
      email,
      status: 1,
    });
    if (oldUser) {
      await userRepo.deleteUser({ email });
    }
    const folderName = "TimeSheetImage";
    // Tìm hoặc tạo thư mục trên Google Drive
    let folder = await driveService.searchFolder(folderName);
    if (!folder) {
      folder = await driveService.createFolder(folderName);
    }
    console.log(folder?.id);
    console.log(file?.path);
    const response = await driveService
      .saveFile(
        Date.now() + "-" + file?.originalname,
        file?.path,
        file?.mimetype,
        folder?.id
      )
      .catch((e) => console.log(e));
    // Lấy link của file từ phản hồi
    // const fileLink = response.data.webViewLink || response.data.webContentLink;

    // console.log("File link:", fileLink);
    console.log("response ", response);
    console.log("File uploaded successfully:", response.data);
    const imageUrl = await driveService.generatePublicUrl(response.data?.id);
    console.log(imageUrl);
    const newUser = await userRepo.createUser({
      email,
      password: await helperApp.hashPW(password),
      fullName,
      avatar: imageUrl.webViewLink,
      status: 1,
    });

    const token = await helperApp.generateJwtToken(
      { id: newUser._id },
      30 * 60 * 1000
    );
    console.log("---gui maillll---");
    await nodeMailerLib({
      to: email,
      subject: "Xác thực tài khoản đăng ký TimeSheet",
      text: `http://localhost:3000/auth/signup-confirm?token=${token}`,
    });

    console.log("---out---");

    return {
      code: HTTP_CODE.created,
      data: token,
      message: "Đăng ký thành công",
    };
  } catch (error) {
    return handleReturn(true, HTTP_CODE?.errorServer, error?.message);
  }
};

const signupConfirm = async (data) => {
  const { token } = data;
  const { id } = await helperApp.decodeToken(token);
  const user = await userRepo.getUserByCondition({
    status: 1,
    _id: id,
  });
  if (user) {
    await userRepo.updateUser({ _id: id }, { status: 2 });
    return handleReturn(false, HTTP_CODE.success, "Xác thực thành công");
  } else {
    return handleReturn(true, HTTP_CODE.badRequest, "Xác thực thất bại");
  }
};

const authService = {
  login,
  signup,
  signupConfirm,
};

export default authService;
