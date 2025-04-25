const Otherincome = require("../models/OtherIncome.model");

const create = async (data) => {
    return await Otherincome.create(data);
};

const getAll = async (id) => {
    return await Otherincome.find({Society: id}).populate("createdBy");
};

const getById = async (id) => {
    return await Otherincome.findById(id).populate("createdBy");
};

const update = async (id, data) => {
    return await Otherincome.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
    return await Otherincome.findByIdAndDelete(id);
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};
