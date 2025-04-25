const Alert = require("../models/EmergencyManagement.model")
const create = async (data) => {
    return await Alert.create(data);
};

const getAll = async (id) => {
    return await Alert.find({ Society: id }).populate("createdBy");
};

const getById = async (id) => {
    return await Alert.findById(id).populate("createdBy");
};

const update = async (id, data) => {
    return await Alert.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
    return await Alert.findByIdAndDelete(id);
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}