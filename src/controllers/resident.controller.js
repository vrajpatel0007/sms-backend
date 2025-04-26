const resident_service = require("../services/resident.service")
const Society = require("../services/society.service")
const SocietyModel = require("../models/society.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { uploadFile } = require("../middleware/upload")
const { send_maile } = require("../services/email.service")

const createResident = async (req, res) => {
    console.log("🚀 ~ req.body:", req.body);
    try {
        const residentData = req.body;
        console.log("🚀 ~ createResident ~ residentData:", residentData)
        console.log("🚀 ~ req.files:", req.files);
        const pass = Math.floor(1000 + Math.random() * 9000);
        const bcrpass = await bcrypt.hash(pass.toString(), 10);
        const photoPath = req.files.photo[0].path;
        const aadharFrontPath = req.files.aadhaarFront[0].path;
        const AadharBackPath = req.files.aadhaarBack[0].path;
        const Vera_OR_LightBillPath = req.files.addressProof[0].path;
        const Rent_AgreementPath = req.files.rentAgreement[0].path;

        const residentphoto = await uploadFile(photoPath);
        const AadharCard_FrontSide = await uploadFile(aadharFrontPath);
        const AadharCard_BackSide = await uploadFile(AadharBackPath);
        const VeraBill_OR_LightBill = await uploadFile(Vera_OR_LightBillPath);
        const Rent_Agreement = await uploadFile(Rent_AgreementPath);
        const member = typeof req.body.members === 'string' ? JSON.parse(req.body.members) : req.body.members || [];
        const vehical = typeof req.body.vehicles === 'string' ? JSON.parse(req.body.vehicles) : req.body.vehicles || [];

        const body = {
            Fullname: residentData.fullname,
            Phone: residentData.phone,
            Email: residentData.email,
            residentphoto: residentphoto.secure_url,
            Age: residentData.age,
            Gender: residentData.gender,
            Wing: residentData.wing,
            Unit: residentData.unit,
            Relation: residentData.relation,
            UnitStatus: residentData.UnitStatus,
            AadharCard_FrontSide: AadharCard_FrontSide.secure_url,
            AadharCard_BackSide: AadharCard_BackSide.secure_url,
            VeraBill_OR_LightBill: VeraBill_OR_LightBill.secure_url,
            Rent_Agreement: Rent_Agreement.secure_url,
            ResidentStatus: residentData.ResidentStatus,
            Ownername: residentData.ownername,
            Ownerphone: residentData.ownerphone,
            OwnerAddress: residentData.owneraddress,
            members: member,
            vehicles: vehical,
            Password: bcrpass,
            createdBy: req.user._id,
            Society: req.user.societyid
        }
        console.log("🚀 ~ createResident ~ body:", body)
        const newResident = await resident_service.create(body);
        // console.log("🚀 ~ createResident ~ newResident:", newResident)
        // console.log("🚀 ~ createResident ~ req.user.societyid:", req.user.societyid)
        // console.log("🚀 ~ createResident ~ newResident.societyid:", newResident.Society)

        // console.log("🚀 ~ createResident ~ Society.findById:",await Society.findOne({_id:req.user.societyid}))
        const Soci = await SocietyModel.findByIdAndUpdate(req.user.societyid,{
            $inc:{unit:1},
            $push:{resident:newResident._id}
        })
        // console.log("🚀 ~ createResident ~ Soci:", Soci)
        const societyId = req.user.societyid
        console.log("🚀 ~ createResident ~ req.user.societyid:", req.user.societyid);
        console.log("🚀 ~ Validated Society ID:", societyId);

        const society = await Society.byid(societyId);
        console.log("🚀 ~ Society.findById result:", society);

        if (!society) {
            return res.status(404).json({ error: "Society not found" });
        }
        const residentid = newResident._id;
        console.log("🚀 ~ createResident ~ newResident._id:", residentid)
        const updatedSociety = await Society.updateunit(societyId, residentid);
        console.log("🚀 ~ createResident ~ residentid:", residentid)

        console.log("🚀 ~ Updated Society:", updatedSociety);

        if (!updatedSociety) {
            return res.status(500).json({ error: "Failed to update society" });
        }
        console.log("🚀 ~ createResident ~ newResident.Email, pass, newResident.Fullname:", newResident.Email, pass, newResident.Fullname)
        await send_maile(newResident.Email, pass, newResident.Fullname)

        return res.status(201).json({ message: "create Successful", data: newResident });
    } catch (error) {
        console.log("🚀 ~ createResident ~ error:", error)
        return res.status(500).json({ error: error.message });
    }
}

// Get Resident
const getResident = async (req, res) => {
    try {
        const { id } = req.params;
        const resident = await resident_service.getById(id);
        if (!resident) {
            return res.status(404).json({ error: "Resident not found" });
        }
        return res.status(200).json(resident);
    } catch (error) {
        console.log("🚀 ~ getResident ~ error:", error);
        return res.status(500).json({ error: error.message });
    }
};

const getAllResident = async (req, res) => {
    try {
        const societyId = req.user.societyid
        console.log("🚀 ~ getAllResident ~ societyId:", societyId)
        const residents = await resident_service.getall(societyId);
        return res.status(200).json(residents);
    } catch (error) {
        console.log("��� ~ getAllResident ~ error:", error);
        return res.status(500).json({ error: error.message });
    }
}

// Update Resident
const updateResident = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = {};


        if (req.body) {
            updatedData.Fullname = req.body.fullname;
            updatedData.Phone = req.body.Phone;
            updatedData.Email = req.body.Email;
            updatedData.Age = req.body.Age;
            updatedData.Gender = req.body.Gender;
            updatedData.Wing = req.body.Wing;
            updatedData.Unit = req.body.Unit;
            updatedData.Relation = req.body.Relation;
        }
        console.log("🚀 ~ updateResident ~ req.body.members:", req.body.members)
        if(req.body.members){
            updatedData.members = typeof req.body.members === 'string' ? JSON.parse(req.body.members) : req.body.members || [];
        }
        if(req.body.vehicles){
            updatedData.vehicles = typeof req.body.vehicles == 'string' ? json.parse(req.body.vehicles) : req.body.vehicles || [];
        }
        console.log("🚀 ~ updateResident ~ updatedData:", updatedData)


        if (req.files) {
            if (req.files.photo) {
                const photoPath = req.files.photo[0].path;
                const residentPhoto = await uploadFile(photoPath);
                updatedData.residentphoto = residentPhoto.secure_url;
            }
            if (req.files.aadhaarFront) {
                const aadharFrontPath = req.files.aadhaarFront[0].path;
                const frontUrl = await uploadFile(aadharFrontPath);
                updatedData.AadharCard_FrontSide = frontUrl.secure_url;
            }
            if (req.files.aadhaarBack) {
                const AadharBackPath = req.files.aadhaarBack[0].path;
                const BackSide = await uploadFile(AadharBackPath);
                updatedData.AadharCard_BackSide = BackSide.secure_url;
            }
            if (req.files.addressProof) {
                const Vera_OR_LightBillPath = req.files.addressProof[0].path;
                const Vera_OR_LightBill = await uploadFile(Vera_OR_LightBillPath);
                updatedData.VeraBill_OR_LightBill = Vera_OR_LightBill.secure_url;
            }
            if (req.files.rentAgreement) {
                const Rent_AgreementPath = req.files.rentAgreement[0].path;
                const RentAgreement = await uploadFile(Rent_AgreementPath);
                updatedData.Rent_Agreement = RentAgreement.secure_url;
            }
        }

        const updatedResident = await resident_service.update(id, updatedData);
        console.log("🚀 ~ updateResident ~ updatedResident:", updatedResident)
        if (!updatedResident) {
            return res.status(404).json({ error: "Resident not found or update failed" });
        }
        return res.status(200).json({ message: "Resident updated successfully", data: updatedResident });
    } catch (error) {
        console.log("🚀 ~ updateResident ~ error:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Delete Resident
const deleteResident = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResident = await resident_service.deleteResident(id);
        if (!deletedResident) {
            return res.status(404).json({ error: "Resident not found" });
        }

        const societyId = req.user.societyid;
        await Society.updateunitRemove(societyId, id);

        return res.status(200).json({ message: "Resident deleted successfully" });
    } catch (error) {
        console.log("🚀 ~ deleteResident ~ error:", error);
        return res.status(500).json({ error: error.message });
    }
};




module.exports = {
    createResident,
    getResident,
    getAllResident,
    updateResident,
    deleteResident
};