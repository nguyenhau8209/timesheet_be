import HTTP_CODE from "../constants/httpResponseCode.js";
import authService from "../services/user.service.js";

const login = async (req, res) => {
  console.log(req.body);
  try {
    const data = await authService.login(req.body);
    if (data?.error) {
      return res.status(data?.code).json({ message: data?.message });
    }
    return res
      .status(data?.code)
      .json({ data: data?.data, message: data?.message });
  } catch (error) {
    return res.status(HTTP_CODE.errorServer).json({ message: error?.message });
  }
};

const signup = async (req, res) => {
  try {
    const data = await authService.signup(req.body, req.file);
    if (data?.error) {
      res.status(data?.code).json({ message: data?.message });
    }
    return res
      .status(data?.code)
      .json({ token: data?.data, message: data?.message });
  } catch (error) {
    return res.status(HTTP_CODE.errorServer).json({ message: error?.message });
  }
};

const signupConfirm = async (req, res) => {
  try {
    const data = await authService.signupConfirm(req.query);
    if (data?.error) {
      return res.status(data?.code).json({ message: data?.message });
    }
    return res.status(data?.code).json({ message: data?.message });
  } catch (error) {
    return res.status(HTTP_CODE.errorServer).json({ message: error?.message });
  }
};

const authController = {
  login,
  signup,
  signupConfirm,
};
export default authController;
