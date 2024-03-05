import HTTP_CODE from "../constants/httpResponseCode.js";
import { handleReturn } from "../helper/handleReturn.js";
import locationRepo from "../repositories/location.repo.js";

const createLocation = async (data) => {
  try {
    const { locationName } = data;
    if (!locationName) {
      return handleReturn(true, HTTP_CODE.badRequest, "Không được để trống");
    }
    const locationNameLowerCase = locationName.toLowerCase();
    console.log("locationNameLowerCase ", locationNameLowerCase);
    const checkLocation = await locationRepo.getLocationByCondition({
      locationName: locationNameLowerCase,
    });
    console.log("checkLocation ", checkLocation);
    if (checkLocation) {
      return handleReturn(true, HTTP_CODE.badRequest, "Địa điểm đã tồn tại");
    }
    const createLocation = await locationRepo.createLocation({
      locationName: locationNameLowerCase,
    });
    if (!createLocation) {
      return handleReturn(
        true,
        HTTP_CODE.badRequest,
        "Tạo địa điểm không thành công"
      );
    }
    return handleReturn(
      false,
      HTTP_CODE.created,
      "Tạo địa điểm thành công",
      createLocation
    );
  } catch (error) {
    return handleReturn(true, `Error in ${error?.message}`);
  }
};

const getLocation = async (data) => {
  try {
    const { id } = data;
    const findLocationById = await locationRepo.getLocationById({ _id: id });
    if (!findLocationById) {
      return handleReturn(true, HTTP_CODE.notFound, "Không tìm thấy địa điểm");
    }
    return handleReturn(
      false,
      HTTP_CODE.success,
      "Thành công",
      findLocationById
    );
  } catch (error) {
    return handleReturn(
      true,
      HTTP_CODE.errorServer,
      `Error in ${error?.message}`
    );
  }
};

const getAllLocation = async () => {
  try {
    const findAllLocation = await locationRepo.getAllLocationByCondition();
    if (!findAllLocation) {
      return handleReturn(true, HTTP_CODE.notFound, "Không tìm thấy địa điểm");
    }
    return handleReturn(
      false,
      HTTP_CODE.success,
      "Thành công",
      findAllLocation
    );
  } catch (error) {
    return handleReturn(
      true,
      HTTP_CODE.errorServer,
      `Error in ${error?.message}`
    );
  }
};
const locationService = {
  createLocation,
  getLocation,
  getAllLocation,
};

export default locationService;
