const requestService = require("../services/request.service");

const createRequest = async (req, res) => {
    try {
        const reqbody = req.body;
        if (!reqbody) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const body = {
            Requester_Name: reqbody.requestername,
            Request_Name: reqbody.requestname,
            Request_Date: reqbody.requestdate,
            Wing: reqbody.wing,
            Unit: reqbody.unit,
            Priority: reqbody.priority,
            Status: reqbody.status,
            createdBy: req.user._id,
            Society: req.user.societyid,
        };
        const request = await requestService.create(body);
        return res.status(201).json(request);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getAllRequests = async (req, res) => {
    try {
        const societyid = req.user.societyid
        const requests = await requestService.getAll(societyid);
        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await requestService.getById(id);
        if (!request) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(request);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await requestService.getById(id);
        if (!request) {
            return res.status(404).json({ message: "Not found" });
        }
        const body = {};
        if (req.body) {
            body.Requester_Name = req.body.Requester_Name;
            body.Request_Name = req.body.Request_Name;
            body.Request_Date = req.body.Request_Date;
            body.Wing = req.body.Wing;
            body.Unit = req.body.Unit;
            body.Priority = req.body.Priority;
            body.Status = req.body.Status;
        }
        const updatedRequest = await requestService.update(id, body);
        return res.status(200).json(updatedRequest);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await requestService.getById(id);
        if (!request) {
            return res.status(404).json({ message: "Already deleted" });
        }
        await requestService.remove(id);
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRequest,
    getAllRequests,
    getRequest,
    updateRequest,
    deleteRequest,
};