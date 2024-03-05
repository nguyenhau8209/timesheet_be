import Location from "../models/location.model.js";
const createLocation = async ({ locationName }) => {
  return await Location.create({ locationName });
};

const getAllLocationByCondition = async (filter = {}) => {
  return await Location.find(filter);
};

const getLocationByCondition = async (filter = {}) => {
  return await Location.findOne(filter);
};

const getLocationById = async (filter = {}) => {
  return await Location.findById(filter);
};

const deleteLocation = async (filter = {}, data) => {
  return await Location.deleteOne(filter, data);
};

const updateLocation = async (filter = {}, data) => {
  return await Location.updateOne(filter, data);
};

const locationRepo = {
  getAllLocationByCondition,
  getLocationByCondition,
  getLocationById,
  createLocation,
  deleteLocation,
  updateLocation,
};

export default locationRepo;
