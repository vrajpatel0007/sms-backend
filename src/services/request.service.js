const Request = require("../models/Request.model");

const create = async (data) => {
    return await Request.create(data);
};

const getAll = async (id) => {
    return await Request.find({Society: id}).populate("createdBy");
};

const getById = async (id) => {
    return await Request.findById(id).populate("createdBy");
};

const update = async (id, data) => {
    return await Request.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
    return await Request.findByIdAndDelete(id);
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};
