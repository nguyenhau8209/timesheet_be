import TimeSheet from "../models/timesheet.model.js";

const createTimeSheet = async ({
  userID,
  start_date,
  end_date,
  contentID,
  description,
  locationID,
  status,
}) => {
  return await TimeSheet.create({
    userID,
    start_date,
    end_date,
    contentID,
    description,
    locationID,
    status,
  });
};

const getTimeSheetByCondition = async (filter = {}) => {
  return await TimeSheet.findOne(filter);
};
const getAllTimeSheetByCondition = async (filter = {}) => {
  return await TimeSheet.find(filter);
};
const getTimeSheetById = async (filter = {}) => {
  return await TimeSheet.findById(filter);
};
const deleteTimeSheet = async (filter = {}) => {
  return await TimeSheet.deleteOne(filter);
};
const updateTimeSheet = async (filter = {}, data) => {
  return await TimeSheet.updateOne(filter, data);
};

const timeSheetRepo = {
  createTimeSheet,
  getAllTimeSheetByCondition,
  getTimeSheetByCondition,
  getTimeSheetById,
  deleteTimeSheet,
  updateTimeSheet,
};

export default timeSheetRepo;
