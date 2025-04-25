const expenses_servise = require("../services/expenses.service")
const { uploadFile } = require("../middleware/upload")

const createexpenses = async (req, res) => {
    try {
        const reqbody = req.body
        const img = req.files.Bill[0].path
        const upload = await uploadFile(img);
        const body = {
            Title: reqbody.title,
            Description: reqbody.description,
            Date: reqbody.date,
            Amount: reqbody.amount,
            Bill: upload.secure_url,
            createdBy: req.user._id,
            Society: req.user.societyid
        }
        const expenses = await expenses_servise.create(body);
        return res.status(201).json(expenses);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get all expenses
const getAllexpenses = async (req, res) => {
    try {
        const societyid = req.user.societyid
        const expensess = await expenses_servise.getAll(societyid);
        return res.status(200).json(expensess);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getexpense = async (req, res) => {
    try {
        const { id } = req.params
        const expenses = await expenses_servise.getById(id);
        if (!expenses) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Update an expenses

const updateexpenses = async (req, res) => {
    try {
        const { id } = req.params;
        const expenses = await expenses_servise.getById(id);
        console.log("🚀 ~ updateexpenses ~ expenses:", expenses);

        if (!expenses) {
            return res.status(404).json({ message: "Not found" });
        }

        const updetbody = {};
        if (req.body) {
            updetbody.Title = req.body.Title;
            updetbody.Description = req.body.Description;
            updetbody.Date = req.body.Date;
            updetbody.Amount = req.body.Amount;
        }
        console.log("🚀 ~ updateexpenses ~ updetbody:", updetbody);

        if (req.files) {
            const Bill = req.files.Bill[0].path;
            const upload = await uploadFile(Bill);
            updetbody.Bill = upload.secure_url;
        } else {
            console.log("🚀 ~ updateexpenses ~ No Bill file provided.");
        }

        const updatedexpenses = await expenses_servise.update(id, updetbody);
        console.log("🚀 ~ updateexpenses ~ updatedexpenses:", updatedexpenses);

        if (!updatedexpenses) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.status(200).json(updatedexpenses);
    } catch (error) {
        console.error("🚀 ~ updateexpenses ~ error:", error);
        return res.status(400).json({ message: error.message });
    }
};


// Delete an expenses 
const deleteexpenses = async (req, res) => {
    try {
        const { id } = req.params
        const expenses = await expenses_servise.getById(id);
        if (!expenses) {
            return res.status(404).json({ message: "already deleted" });
        }
        const deletedexpenses = await expenses_servise.remove(req.params.id);
        if (!deletedexpenses) return res.status(404).json({ message: "Not found" });
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createexpenses,
    getAllexpenses,
    updateexpenses,
    deleteexpenses,
    getexpense
}