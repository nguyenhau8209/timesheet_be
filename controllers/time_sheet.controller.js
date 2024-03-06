import HTTP_CODE from "../constants/httpResponseCode.js";
import timeSheetService from "../services/time_seet.service.js";

const createTimeSheet = async (req, res) => {
  try {
    const data = await timeSheetService.createTimeSheet(req.body);
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

const timeSheetController = {
  createTimeSheet,
};
export default timeSheetController;
