import HTTP_CODE from "../constants/httpResponseCode.js";
import contentService from "../services/content.service.js";

const createContent = async (req, res) => {
  try {
    const data = await contentService.createContent(req.body);
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

const getContent = async (req, res) => {
  try {
    const data = await contentService.getContent(req.params);
    if (data?.error) {
      return res.status(data?.code).json({ message: data?.message });
    }
    return res
      .status(data?.code)
      .json({ data: data?.data, message: data?.message });
  } catch (error) {
    return res
      .status(HTTP_CODE.errorServer)
      .json({ message: `Error in ${error?.message}` });
  }
};

const getAllContent = async (req, res) => {
  try {
    const data = await contentService.getAllContent();
    if (data?.error) {
      return res
        .status(data?.code)
        .json({ data: data?.data, message: data?.message });
    }
    return res
      .status(data?.code)
      .json({ data: data?.data, message: data?.message });
  } catch (error) {
    return res
      .status(HTTP_CODE.errorServer)
      .json({ message: `Error in ${error?.message}` });
  }
};

const deleteContent = async (req, res) => {
  try {
    const data = await contentService.deleteContent(req.params);
    if (data?.error) {
      return res.status(data?.code).json({ message: data?.message });
    }
    return res.status(data?.code).json({ message: data?.message });
  } catch (error) {
    return res
      .status(HTTP_CODE.errorServer)
      .json({ message: `Error in ${error?.message}` });
  }
};

const updateContent = async (req, res) => {
  try {
    const data = await contentService.updateContent(req.params, req.body);
    if (data?.error) {
      return res.status(data?.code).json({ message: data?.message });
    }
    return res.status(data?.code).json({ message: data?.message });
  } catch (error) {
    return res
      .status(HTTP_CODE.errorServer)
      .json({ message: `Error in ${error?.message}` });
  }
};
const contentController = {
  createContent,
  getContent,
  getAllContent,
  deleteContent,
  updateContent,
};
export default contentController;
