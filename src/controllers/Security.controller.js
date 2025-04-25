const securityService = require("../services/security.service");
const { uploadFile } = require("../middleware/upload")
const { send_maile } = require("../services/email.service")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new security personnel
const register = async (req, res) => {
    try {
        const registersecurity = req.body;
        console.log("🚀 ~ register ~ registersecurity:", registersecurity)

        const pass = Math.floor(1000 + Math.random() * 9000);
        console.log("🚀 ~ register ~ pass:", pass)
        const bcrpass = await bcrypt.hash(pass.toString(), 10);
        console.log("🚀 ~ register ~ req.files:", req.files)
        const photopath = req.files.photo[0].path;
        const aadharcardpath = req.files.Aadhar_Card[0].path;

        const photo = await uploadFile(photopath);
        console.log("🚀 ~ register ~ photo:", photo)
        const Aadhar_Card = await uploadFile(aadharcardpath);
        console.log("🚀 ~ register ~ Aadhar_Card:", Aadhar_Card)
        const body = {
            photo: photo.secure_url,
            Full_Name: registersecurity.Full_Name,
            Email: registersecurity.email,
            phone_Number: registersecurity.phone_Number,
            Gender: registersecurity.Gender,
            Shift: registersecurity.Shift,
            Shift_Data: registersecurity.Shift_Data,
            Shift_Time: registersecurity.Shift_Time,
            Aadhar_Card: Aadhar_Card.secure_url,
            Password: bcrpass,
            createdBy: req.user._id,
            Society: req.user.societyid
        }
        console.log("🚀 ~ register ~ photo.secure_url:", photo.secure_url)
        console.log("🚀 ~ register ~ Aadhar_Card.secure_url,:", Aadhar_Card.secure_url,)
        console.log("🚀 ~ register ~ body:", body)
        const security = await securityService.register(body);
        await send_maile(security.Email, pass, security.Full_Name)
        console.log("🚀 ~ register ~ security.Email, pass, security.Full_Name:", security.Email, pass, security.Full_Name)
        console.log("🚀 ~ register ~ security:", security)
        res.status(201).json({ message: "Security personnel registered", data: security });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update security personnel details
const update = async (req, res) => {
    try {
        const id = req.params.id;
        const updatesecurity = req.body;

        const body = {}
        if (req.body) {
            body.Full_Name = updatesecurity.Full_Name,
            body.Email = updatesecurity.Email,
            body.phone_Number = updatesecurity.phone_Number,
            body.Gender = updatesecurity.Gender,
            body.Shift = updatesecurity.Shift,
            body.Shift_Data = updatesecurity.Shift_Data,
            body.Shift_Time = updatesecurity.Shift_Time
        }
        if (req.files) {
            if (req.files.photo) {
                const photopath = req.files.photo[0].path;
                console.log("🚀 ~ update ~ photopath:", photopath)
                const photo = await uploadFile(photopath);
                console.log("🚀 ~ update ~ photo:", photo)
                body.photo = photo.secure_url;
            }
            if (req.files.Aadhar_Card) {
                const aadharcardpath = req.files.Aadhar_Card[0].path;
                const Aadhar_Card = await uploadFile(aadharcardpath);
                body.Aadhar_Card = Aadhar_Card.secure_url;
            }
        }
        console.log("🚀 ~ update ~ body:", body)
        const updatedSecurity = await securityService.update(id, body);
        if (!updatedSecurity) {
            return res.status(404).json({ message: "Security personnel not found" });
        }
        res.status(200).json({ message: "Security personnel updated", data: updatedSecurity });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a security personnel's details
const getSecurity = async (req, res) => {
    try {
        const id = req.params.id;
        const security = await securityService.findById(id);
        if (!security) {
            return res.status(404).json({ message: "Security personnel not found" });
        }
        res.status(200).json(security);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a security personnel
const deleteSecurity = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await securityService.deleteSecurity(id);
        if (!deleted) {
            return res.status(404).json({ message: "Security personnel not found" });
        }
        res.status(200).json({ message: "Security personnel deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getgetallsecurity = async (req, res) => {
    try {
        const societyid = req.user.societyid
        const security = await securityService.getAllSecurity(societyid);
        return res.status(200).json(security);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//   Visitor

const createVisitor = async (req, res) => {
    try {
        const reqbody = req.body;
        if (!reqbody) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const body = {
            Visitor_Name: reqbody.Visitor_Name,
            Wing: reqbody.Wing,
            Unit: reqbody.Unit,
            Date: reqbody.Date,
            Time: reqbody.Time,
            Phone: reqbody.Phone,
            createdBy: req.user._id,
            Society: req.user.societyid
        };
        const visitor = await securityService.create(body);
        res.status(201).json(visitor);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getAllVisitors = async (req, res) => {
    try {
        const societyid = req.user.societyid
        const visitors = await securityService.getAllVisitors(societyid);
        res.status(200).json(visitors);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}



// Securityprotocol

const createSecurityProtocol = async (req, res) => {
    try {
        const reqbody = req.body;
        if (!reqbody) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const body = {
            Title: reqbody.Title,
            Description: reqbody.Description,
            Time: reqbody.Time,
            createdBy: req.user._id,
            Society: req.user.societyid
        };
        const securityProtocol = await securityService.createSecurityProtocol(body);
        res.status(201).json(securityProtocol);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getAllSecurityProtocols = async (req, res) => {
    try {
        const societyid = req.user.societyid
        const securityProtocols = await securityService.getAllSecurityProtocols(societyid);
        res.status(200).json(securityProtocols);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getSecurityProtocol = async (req, res) => {
    try {
        const id = req.params.id;
        const securityProtocol = await securityService.findByIdSecurityProtocol(id);
        if (!securityProtocol) {
            return res.status(404).json({ message: 'Security protocol not found' });
        }
        res.status(200).json(securityProtocol);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const updateSecurityProtocol = async (req, res) => {
    try {
        const id = req.params.id;
        const reqbody = req.body;
        if (!reqbody) {
            return res.status(400).json({ message: 'No data to update' });
        }
        const body = {}
        if(req.body){
            body.Title = reqbody.Title,
            body.Description = reqbody.Description,
            body.Time = reqbody.Time
        }
        const updatedSecurityProtocol = await securityService.updateSecurityProtocol(id, body);
        res.status(200).json(updatedSecurityProtocol);
    }catch(err){
        return res.status(500).json({ error: err.message} )
    }
}

const deleteSecurityProtocol = async (req, res) => {
    try {
        const id = req.params.id;
        const securityProtocol = await securityService.findByIdSecurityProtocol(id);
        if (!securityProtocol) {
            return res.status(404).json({ message: 'Security protocol not found' });
        }
        const deleted = await securityService.deleteSecurityProtocol(id);
        res.status(200).json({ message: 'Security protocol deleted' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    register,
    update,
    getSecurity,
    deleteSecurity,
    getgetallsecurity,
    createVisitor,
    getAllVisitors,
    createSecurityProtocol,
    getAllSecurityProtocols,
    getSecurityProtocol,
    updateSecurityProtocol,
    deleteSecurityProtocol,
};
