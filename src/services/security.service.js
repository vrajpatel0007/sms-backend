const Security = require("../models/Security.model");
const Visitor = require("../models/Visitor.model")
const Securityprotocol = require("../models/Securityprotocol.model");
const register = async (body) => {
    return await Security.create(body);
};

const update = async (id, body) => {
    return await Security.findByIdAndUpdate(id, body, { new: true });
};

const findById = async (id) => {
    return await Security.findById(id).populate("createdBy").populate("Society");
};

const deleteSecurity = async (id) => {
    return await Security.findByIdAndDelete(id);
};

const findByEmail = async (email) => {
    return await Security.findOne({ Email: email });
};
const getAllSecurity = async (societyid) => {
    return await Security.find({ Society: societyid }).populate("createdBy").populate("Society");
}


const create = async (data) => {
    return await Visitor.create(data);
};

const getAllVisitors = async (id) => {
    return await Visitor.find({ Society: id }).populate("createdBy");
};


const createSecurityProtocol = async (data) => {
    return await Securityprotocol.create(data);
}

const getAllSecurityProtocols = async (id) => {
    return await Securityprotocol.find({ Society: id }).populate("createdBy");
}

const findByIdSecurityProtocol = async (id) => {
    return await Securityprotocol.findById(id).populate("createdBy");
}

const updateSecurityProtocol = async (id, data) => {
    return await Securityprotocol.findByIdAndUpdate(id, data, { new: true });
}

const deleteSecurityProtocol = async (id) => {
    return await Securityprotocol.findByIdAndDelete(id);
}


module.exports = {
    register,
    update,
    findById,
    deleteSecurity,
    findByEmail,
    getAllSecurity,

    create,
    getAllVisitors,

    createSecurityProtocol,
    getAllSecurityProtocols,
    findByIdSecurityProtocol,
    updateSecurityProtocol,
    deleteSecurityProtocol,

};