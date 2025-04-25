const Expenses = require("../models/Expenses.model")


const create = async (data) => {
  return await Expenses.create(data);
};


const getAll = async (id) => {
  return await Expenses.find({ Society: id }).populate("createdBy");;
};


const getById = async (id) => {
  return await Expenses.findById(id).populate("createdBy");;
};


const update = async (id, data) => {
  return await Expenses.findByIdAndUpdate(id, data, { new: true });
};


const remove = async (id) => {
  return await Expenses.findByIdAndDelete(id);
};


module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
}