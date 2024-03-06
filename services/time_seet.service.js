import HTTP_CODE from "../constants/httpResponseCode.js";
import { handleReturn } from "../helper/handleReturn.js";
import timeSheetRepo from "../repositories/time_sheet.repo.js";

const createTimeSheet = async (data) => {
  const { userID, start_date, end_date, contentID, description, locationID } =
    data;

  if (
    !userID ||
    !start_date ||
    !end_date ||
    !contentID ||
    !description ||
    !locationID
  ) {
    return handleReturn(true, HTTP_CODE.badRequest, "Không được để trống");
  }
  const createTimeSheet = await timeSheetRepo.createTimeSheet({
    userID,
    start_date,
    end_date,
    contentID,
    description,
    locationID,
    status: 1,
  });

  if (!createTimeSheet) {
    return handleReturn(
      true,
      HTTP_CODE.badRequest,
      "Tạo TimeSheet không thành công"
    );
  }
  return handleReturn(
    false,
    HTTP_CODE.created,
    "Tạo TimeSheet thành công",
    createTimeSheet
  );
};

const timeSheetService = {
  createTimeSheet,
};
export default timeSheetService;
