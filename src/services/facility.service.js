const Facility = require("../models/Facility.model");

const create = async (data) => {
  return await Facility.create(data);
};

const getAll = async (id) => {
  return await Facility.find({Society: id}).populate("createdBy");;
};

const getById = async (id) => {
  return await Facility.findById(id).populate("createdBy");;
};

const update = async (id, data) => {
  return await Facility.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await Facility.findByIdAndDelete(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
