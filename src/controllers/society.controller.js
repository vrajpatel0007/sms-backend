const society_service = require('../services/society.service');

const createSociety = async (req, res) => {
    try {
        const societyData = req.body;
        console.log("🚀 ~ createSociety ~ societyData:", societyData)
        if (!societyData) {
            res.status(404).json({ message: "all field is required" })
        }
        const newSociety = await society_service.createSociety(societyData);
        return res.status(201).json({ message: "create Successful", data: newSociety });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getSociety = async (req, res) => {
    try {
        const society = await society_service.getSociety();
        if (!society) {
            return res.status(404).json({ message: 'Society not found' });
        }
        return res.status(200).json({ data: society });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createSociety,
    getSociety,
};
