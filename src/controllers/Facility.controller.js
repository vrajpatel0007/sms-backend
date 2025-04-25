const facilityService = require("../services/facility.service");

const createFacility = async (req, res) => {
    try {
        const body = {
            Facility_Name: req.body.facilityname,
            Description: req.body.description,
            Schedule_Service_Date: req.body.scheduleservicedate,
            Remind_Before: req.body.remindbefore,
            createdBy: req.user._id,
            Society: req.user.societyid,
        };

        const facility = await facilityService.create(body);
        return res.status(201).json(facility);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getAllFacilities = async (req, res) => {
    try {
        const societyid = req.user.societyid
        const facilities = await facilityService.getAll(societyid);
        return res.status(200).json(facilities);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFacility = async (req, res) => {
    try {
        const { id } = req.params;
        const facility = await facilityService.getById(id);

        if (!facility) {
            return res.status(404).json({ message: "Facility not found" });
        }
        return res.status(200).json(facility);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateFacility = async (req, res) => {
    try {
        const { id } = req.params;
        const facility = await facilityService.getById(id);

        if (!facility) {
            return res.status(404).json({ message: "Facility not found" });
        }
        const body = {}
        if (req.body) {
            body.Facility_Name = req.body.Facility_Name,
                body.Description = req.body.Description,
                body.Schedule_Service_Date = req.body.Schedule_Service_Date,
                body.Remind_Before = req.body.Remind_Before
        }
        const updatedFacility = await facilityService.update(id, body);
        return res.status(200).json(updatedFacility);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deleteFacility = async (req, res) => {
    try {
        const { id } = req.params;
        const facility = await facilityService.getById(id);

        if (!facility) {
            return res.status(404).json({ message: "Facility already deleted" });
        }

        await facilityService.remove(id);
        return res.status(200).json({ message: "Facility deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createFacility,
    getAllFacilities,
    getFacility,
    updateFacility,
    deleteFacility,
};
