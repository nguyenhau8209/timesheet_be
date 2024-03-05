import HTTP_CODE from "../constants/httpResponseCode.js";
import locationService from "../services/location.service.js";

const createLocation = async (req, res) => {
  try {
    const data = await locationService.createLocation(req.body);
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

const getLocation = async (req, res) => {
  try {
    const data = await locationService.getLocation(req.params);
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

const getAllLocation = async (req, res) => {
  try {
    const data = await locationService.getAllLocation();
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
const locationController = {
  createLocation,
  getLocation,
  getAllLocation,
};
export default locationController;
