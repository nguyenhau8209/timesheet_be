import Content from "../models/content.model.js";

const createContent = async ({ content }) => {
  return await Content.create({ content });
};

const getAllContentByCondition = async () => {
  return await Content.find();
};

const getContentByCondition = async (filter = {}) => {
  return await Content.findOne(filter);
};

const getContentById = async (filter = {}) => {
  return await Content.findById(filter);
};

const deleteContent = async (filter = {}, data) => {
  return await Content.deleteOne(filter, data);
};

const updateContent = async (filter = {}, data) => {
  return await Content.updateOne(filter, data);
};

const contentRepo = {
  getAllContentByCondition,
  getContentByCondition,
  getContentById,
  createContent,
  deleteContent,
  updateContent,
};

export default contentRepo;
