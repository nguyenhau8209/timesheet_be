import userModel from "../models/auth.model.js";

const getUserById = async (id) => {
  return await userModel.findById(id);
};

const getAllUserByCondition = async (filter = {}) => {
  return await userModel.find(filter);
};

const getUserByCondition = async (filter = {}) => {
  console.log(filter);
  return await userModel.findOne(filter);
};

const createUser = async ({ email, password, fullName, avatar }) => {
  return await userModel.create({ email, password, fullName, avatar });
};

const deleteUser = async (filter = {}) => {
  return await userModel.deleteOne(filter);
};

const updateUser = async (filter, data) => {
  return await userModel.updateOne(filter, data);
};

const userRepo = {
  getUserById,
  getAllUserByCondition,
  getUserByCondition,
  createUser,
  deleteUser,
  updateUser,
};
export default userRepo;
