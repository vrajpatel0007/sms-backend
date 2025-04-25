const Importantnumber = require("../models/importantnumber.model")


const create = async (data) => {
  return await Importantnumber.create(data);
};


const getAll = async (id) => {
  return await Importantnumber.find({Society: id}).populate("createdBy");;
};


const getById = async (id) => {
  return await Importantnumber.findById(id).populate("createdBy");;
};


const update = async (id, data) => {
  return await Importantnumber.findByIdAndUpdate(id, data, { new: true });
};


const remove = async (id) => {
  return await Importantnumber.findByIdAndDelete(id);
};

const findbynumber = async (num) => {
  return await Importantnumber.findOne({ Phonenumber: num });
}

module.exports ={
  create,
  getAll,
  getById,
  update,
  remove,
  findbynumber
}