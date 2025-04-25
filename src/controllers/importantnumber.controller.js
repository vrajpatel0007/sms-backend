const importantnumber_servise = require("../services/importantnumber.service")

const createImportantNumber = async (req, res) => {
    try {
        const num = req.body.Phonenumber
        console.log("🚀 ~ createImportantNumber ~ num:", num)
        const number = await importantnumber_servise.findbynumber(num)
        const body = {
            Fullname:req.body.Fullname ,
            Phonenumber:req.body.Phonenumber,
            Work:req.body.Work ,
            createdBy:req.user._id,
            Society: req.user.societyid
        }
        const importantNumber = await importantnumber_servise.create(body);
        return res.status(201).json(importantNumber);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get all important numbers
const getAllImportantNumbers = async (req, res) => {
    try {
        const societyid = req.user.societyid
        console.log("🚀 ~ getAllImportantNumbers ~ societyid:", societyid)
        const importantNumbers = await importantnumber_servise.getAll(societyid);
        return res.status(200).json(importantNumbers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// Update an important number
const updateImportantNumber = async (req, res) => {
    try {
        const { id } = req.params
        const importantNumber = await importantnumber_servise.getById(id);
        console.log("🚀 ~ updateImportantNumber ~ id:", id)
        if (!importantNumber) {
            return res.status(404).json({ message: "Not found" });
        }
        const updetbody = {}
        console.log("🚀 ~ updateImportantNumber ~ req.body:", req.body)
        if (req.body) {
            updetbody.Fullname = req.body.Fullname
            updetbody.Phonenumber = req.body.Phonenumber
            updetbody.Work = req.body.Work
        }
        const updatedImportantNumber = await importantnumber_servise.update(id, updetbody);
        if (!updatedImportantNumber) return res.status(404).json({ message: "Not found" });
        return res.status(200).json(updatedImportantNumber);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Delete an important number
const deleteImportantNumber = async (req, res) => {
    try {
        const { id } = req.params
        const importantNumber = await importantnumber_servise.getById(id);
        if (!importantNumber) {
            return res.status(404).json({ message: "already deleted" });
        }
        const deletedImportantNumber = await importantnumber_servise.remove(req.params.id);
        if (!deletedImportantNumber) return res.status(404).json({ message: "Not found" });
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createImportantNumber,
    getAllImportantNumbers,
    updateImportantNumber,
    deleteImportantNumber,
}