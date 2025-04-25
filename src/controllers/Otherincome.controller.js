const Otherincome_service = require('../services/Otherincome.service');

// Create a new other income
const createOtherincome = async (req, res) => {
    try {
        const reqbody = req.body;
        if (!reqbody) {
            return res.status(400).json({ message: "all required" })
        }
        const body = {
            Title: reqbody.Title,
            Date: reqbody.Date,
            Due_Date: reqbody.Due_Date,
            Description: reqbody.Description,
            Amount: reqbody.Amount,
            createdBy: req.user._id,
            Society: req.user.societyid
        }
        const otherincome = await Otherincome_service.create(body);
        return res.status(201).json(otherincome);
    } catch (error) {
        console.error("Error creating other income: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Get all other incomes for a society
const getallOtherincomes = async (req, res) => {
    try {
        const societyId = req.user.societyid;
        const otherincomes = await Otherincome_service.getAll(societyId);
        return res.status(201).json(otherincomes);
    } catch (error) {
        console.log("🚀 ~ getallOtherincomes ~ error:", error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Get a specific other income
const getOtherincome = async (req, res) => {
    try {
        const id = req.params.id;
        const otherincome = await Otherincome_service.getById(id);
        if (!otherincome) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(201).json(otherincome);
    } catch (error) {
        console.log("🚀 ~ getOtherincome ~ error:", error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Update an existing other income
const updateOtherincome = async (req, res) => {
    try {
        const id = req.params.id;
        const otherincome = await Otherincome_service.getById(id);
        if (!otherincome) {
            return res.status(404).json({ message: "Not found" });
        }
        const reqbody = req.body;
        const body = {}
        if (req.body) {
            body.Title = reqbody.Title,
            body.Date = reqbody.Date,
            body.Due_Date = reqbody.Due_Date,
            body.Description = reqbody.Description,
            body.Amount = reqbody.Amount
        }
        const updatedOtherincome = await Otherincome_service.update(id, body);
        return res.status(201).json(updatedOtherincome);
    } catch (error) {
        console.log("~ updateOtherincome ~ error:", error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Delete an existing other income
const deleteOtherincome = async (req, res) => {
    try {
        const id = req.params.id;
        const otherincome = await Otherincome_service.getById(id);
        if (!otherincome) {
            return res.status(404).json({ message: "Not found" });
        }
        await Otherincome_service.remove(id);
        return res.status(201).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log("~ deleteOtherincome ~ error:", error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getOtherincome,
    createOtherincome,
    getallOtherincomes,
    updateOtherincome,
    deleteOtherincome,
 };