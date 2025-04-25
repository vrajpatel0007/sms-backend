const Manager = require("../models/Manager.model");

const register = async (body) => {
  return Manager.create(body);
};

const findemail = async (email) => {
  return await Manager.findOne({ Email: email });
};

const findById = async (id) => {
  return await Manager.findById(id);
}

const update = async (id, body) => {
  return await Manager.findByIdAndUpdate(id, body, { new: true });
}

const addotp = async (id, otp) => {
  return await Manager.findByIdAndUpdate(id, { OTP: otp }, { new: true });
}

const removeotp = async (id) => {
  return await Manager.findByIdAndUpdate(id, { OTP: null }, { new: true });
}

const updatepassword = async (id, password) => {
  return await Manager.findByIdAndUpdate(id, { Password: password }, { new: true });
}

module.exports = {
  register,
  findemail,
  findById,
  update,
  addotp,
  removeotp,
  updatepassword
};
