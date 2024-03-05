import HTTP_CODE from "../constants/httpResponseCode.js";
import contentRepo from "../repositories/content.repo.js";
import { handleReturn } from "../helper/handleReturn.js";

const createContent = async (data) => {
  try {
    const { content } = data;
    if (!content) {
      return handleReturn(true, HTTP_CODE.badRequest, "Không được để trống");
    }
    const contentLowerCase = content.toLowerCase();
    console.log("contentLowerCase ", contentLowerCase);
    const checkContent = await contentRepo.getContentByCondition({
      content: contentLowerCase,
    });
    console.log("checkContent ", checkContent);
    if (checkContent) {
      return handleReturn(true, HTTP_CODE.badRequest, "Nội dung đã tồn tại");
    }
    const createContent = await contentRepo.createContent({
      content: contentLowerCase,
    });
    if (!createContent) {
      return handleReturn(
        true,
        HTTP_CODE.badRequest,
        "Tạo nội dung không thành công"
      );
    }
    return handleReturn(
      false,
      HTTP_CODE.created,
      "Tạo nội dung thành công",
      createContent
    );
  } catch (error) {
    return handleReturn(true, `Error in ${error?.message}`);
  }
};
const getContent = async (data) => {
  try {
    const { id } = data;
    const findContentById = await contentRepo.getContentById({ _id: id });
    if (!findContentById) {
      return handleReturn(true, HTTP_CODE.notFound, `Không tìm thấy nội dung`);
    }
    return handleReturn(
      false,
      HTTP_CODE.success,
      "Thành công",
      findContentById
    );
  } catch (error) {
    return handleReturn(
      true,
      HTTP_CODE.errorServer,
      `Error in ${error?.message}`
    );
  }
};

const getAllContent = async () => {
  try {
    const findAllContents = await contentRepo.getAllContentByCondition();
    if (!findAllContents) {
      return handleReturn(true, HTTP_CODE.notFound, "Không tìm thấy nội dung");
    }
    return handleReturn(
      false,
      HTTP_CODE.success,
      "Thành công",
      findAllContents
    );
  } catch (error) {
    return handleReturn(
      true,
      HTTP_CODE.errorServer,
      `Error in ${error?.message}`
    );
  }
};

const deleteContent = async (data) => {
  try {
    const { id } = data;
    const findContentById = await contentRepo.getContentById({ _id: id });
    if (!findContentById) {
      return handleReturn(true, HTTP_CODE.notFound, ` Không tìm thấy nội dung`);
    }
    const deleteContent = await contentRepo.deleteContent({ _id: id });
    if (!deleteContent) {
      return handleReturn(
        true,
        HTTP_CODE.badRequest,
        "Xóa nội dung không thành công"
      );
    }
    return handleReturn(false, HTTP_CODE.success, "Xoá thành công");
  } catch (error) {
    return handleReturn(
      true,
      HTTP_CODE.errorServer,
      `Error in ${error?.message}`
    );
  }
};
const updateContent = async (idContent, data) => {
  try {
    const { id } = idContent;
    const findContentById = await contentRepo.getContentById({ _id: id });
    if (!findContentById) {
      return handleReturn(true, HTTP_CODE?.notFound, "Không tìm thấy nội dung");
    }
    const updateContent = await contentRepo.updateContent(
      { _id: id },
      { ...data }
    );
    if (!updateContent) {
      return handleReturn(
        true,
        HTTP_CODE.badRequest,
        "Cập nhật nội dung không thành công"
      );
    }
    return handleReturn(
      false,
      HTTP_CODE.success,
      "Cập nhật nội dung thành công"
    );
  } catch (error) {
    return handleReturn(
      true,
      HTTP_CODE.errorServer,
      `Error in ${error?.message}`
    );
  }
};
const contentService = {
  createContent,
  getContent,
  getAllContent,
  deleteContent,
  updateContent,
};

export default contentService;
