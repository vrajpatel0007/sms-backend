require("dotenv").config();
const manager_service = require("../services/manager.service");
const securityService = require("../services/security.service");
const resident_service = require("../services/resident.service")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { send_maile } = require("../services/email.service")
const { send_otp } = require("../services/otp.service")
const path = require("path");
const { uploadFile } = require("../middleware/upload")
// register
const register = async (req, res) => {
  console.log(
    "==================================== registr ===================================="
  );
  const reqbody = req.body;
  console.log("🚀 ~ register ~ reqbody:", reqbody);
  try {
    if (!reqbody) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const managerExists = await manager_service.findemail(reqbody.Email);
    if (managerExists) {
      return res.status(403).json({ message: "email already exists" });
    }
    const bcrpass = await bcrypt.hash(reqbody.Password, 10);
    const body = {
      Lastname: reqbody.Lastname,
      Firstname: reqbody.Firstname,
      Email: reqbody.Email,
      Number: reqbody.Number,
      Country: reqbody.Country,
      State: reqbody.State,
      society: reqbody.societyid,
      City: reqbody.City,
      Password: bcrpass,
    };
    console.log("🚀 ~ register ~ body:", body)
    const manager = await manager_service.register(body);
    return res
      .status(200)
      .json({ message: "manager registered successfully", manager });
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error)
    return res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.user._id;
    console.log("🚀 ~ update ~ id:", id)
    const manager = await manager_service.findById(id);
    console.log("🚀 ~ update ~ manager:", manager)
    if (!manager) {
      return res.status(404).json({ message: "Not found" });
    }
    const body = {}
    if (req.body) {
      body.Firstname = req.body.Firstname
      body.Lastname = req.body.Lastname
      body.Number = req.body.Number
      body.Email = req.body.Email
      body.society = req.body.societyid
      body.Country = req.body.Country
      body.State = req.body.State
      body.City = req.body.City
    }
    console.log("🚀 ~ update ~ body:", body)
    console.log("🚀 ~ update ~ req.files:", req.files)
    if (req.files && req.files.Image) {
      const img = req.files.Image[0].path
      console.log("🚀 ~ update ~ img:", img)
      const upload = await uploadFile(img);
      console.log("🚀 ~ update ~ upload:", upload)
      body.Image = upload.secure_url
    }
    const updatedmanager = await manager_service.update(id, body);
    return res.status(200).json(updatedmanager);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// login
const login = async (req, res) => {
  console.log("============login============");
  try {
    const body = req.body;
    const { Password, Email } = body;
    console.log("🚀 ~ login ~ Password:", Password);

    const manager = await manager_service.findemail(Email);
    console.log("🚀 ~ login ~ manager:", manager)
    const resident = await resident_service.findemail(Email);
    const security = await securityService.findByEmail(Email);

    if (manager) {
      const bcryptpass = await bcrypt.compare(Password, manager.Password);
      console.log("🚀 ~ login ~ bcryptpass:", bcryptpass);
      if (!bcryptpass) {
        return res.status(404).json({ message: "Incorrect Password" });
      }
      const payload = {
        _id: manager._id,
        email: manager.Email,
        role: manager.Role,
        societyid: manager.society,
      };
      const token = jwt.sign(payload, process.env.SECRET_key, { expiresIn: "1d" });
      console.log("🚀 ~ login ~ token generated:", token);
      return res.status(200).json({ message: "Manager Login Successful", token });
    }

    if (resident) {
      const bcryptpass = await bcrypt.compare(Password, resident.Password);
      console.log("🚀 ~ login ~ bcryptpass:", bcryptpass);
      if (!bcryptpass) {
        return res.status(404).json({ message: "Incorrect Password" });
      }
      const payload = {
        _id: resident._id,
        email: resident.Email,
        role: resident.Role,
        societyid: resident.Society,
      };
      const token = jwt.sign(payload, process.env.SECRET_key, { expiresIn: "1d" });
      return res.status(200).json({ message: "Resident Login Successful", token });
    }

    if (security) {
      const bcryptpass = await bcrypt.compare(Password, security.Password); // Fixed variable name
      console.log("🚀 ~ login ~ bcryptpass:", bcryptpass);
      if (!bcryptpass) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      const payload = {
        _id: security._id,
        email: security.Email,
        role: security.Role,
        societyid: security.Society,
      };
      const token = jwt.sign(payload, process.env.SECRET_key, { expiresIn: "1d" });
      return res.status(200).json({ message: "Security Login Successful", token });
    }

    return res.status(403).json({ message: "Invalid Credentials" });
  } catch (error) {
    console.error("🚀 ~ login ~ error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


const sed_otp = async (req, res) => {
  try {
    const { Email } = req.body;
    console.log("🚀 ~ sed_otp ~ Email:", Email)
    const manager = await manager_service.findemail(Email)
    console.log("🚀 ~ constsed_otp= ~ manager:", manager)
    if (!manager) {
      return res.status(403).json({ message: "manager Not Found" })
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("🚀 ~ sed_otp ~ otp:", otp)
    const addotp = await manager_service.addotp(manager._id, otp)
    const ot = await send_otp(Email, manager.Firstname, manager.Lastname, otp);
    return res.status(200).json({ message: "OTP sent successfully", data: Email });
  } catch (error) {
    console.error("🚀 ~ sed_otp ~ error:", error.message);
    return res.status(500).json({ message: error.message })
  }
}

const otpverify = async (req, res) => {
  try {
    const { Email, otp } = req.body;
    console.log("🚀 ~ otpverify ~ req.body:", req.body)
    const manager = await manager_service.findemail(Email)
    console.log("🚀 ~ otpverify ~ manager:", manager)
    if (!manager) {
      return res.status(403).json({ message: "manager Not Found" })
    }
    if (otp != manager.OTP) {
      return res.status(404).json({ message: "Incorrect OTP" });
    }
    const updatedmanager = await manager_service.removeotp(manager._id)
    console.log("🚀 ~ otpverify ~ updatedmanager:", updatedmanager)
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message })
  }
}

const forgotpassword = async (req, res) => {
  try {
    const { Email, newpass } = req.body;
    console.log("🚀 ~ forgotpassword ~ Email:", Email)
    const manager = await manager_service.findemail(Email)
    console.log("🚀 ~ forgotpassword ~ manager:", manager)
    if (!manager) {
      return res.status(403).json({ message: "manager Not Found" })
    }
    const bcrpass = await bcrypt.hash(newpass, 10);
    console.log("🚀 ~ forgotpassword ~ bcrpass:", bcrpass)
    const updatedmanager = await manager_service.updatepassword(manager._id, bcrpass)
    console.log("🚀 ~ forgotpassword ~ updatedmanager:", updatedmanager)
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("🚀 ~ forgotpassword ~ error:", error.message);
    return res.status(500).json({ message: error.message })
  }
}


const getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const manager = await manager_service.findById(id);
    if (!manager) {
      return res.status(403).json({ message: "Not found" });
    }
    return res.status(200).json(manager);
  } catch (error) {
    console.error("🚀 ~ getProfile ~ error:", error.message);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  update,
  login,
  sed_otp,
  otpverify,
  forgotpassword,
  getProfile
};
