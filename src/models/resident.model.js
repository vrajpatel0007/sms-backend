const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema(
  {
    Fullname: {
      type: String,
      // require: true
    },
    Phone: {
      type: String,
      // require: true
    },
    Email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/],
      // require: true
    },
    residentphoto: {
      type: String,
      // require: true
    },
    Age: {
      type: String,
      // require: true
    },
    Gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      // require: true
    },
    Wing: {
      type: String,
      // require: true
    },
    Unit: {
      type: String,
      // require: true
    },
    Relation: {
      type: String,
      // require: true
    },
    AadharCard_FrontSide: {
      type: String,
      // require: true
    },
    AadharCard_BackSide: {
      type: String,
      // require: true
    },
    VeraBill_OR_LightBill: {
      type: String,
      // require: true
    },
    Rent_Agreement: {
      type: String,
      // require: true
    },
    UnitStatus: {
      type: String,
      enum: ["Occupied", "Vacate"],
      require: true
    },
    ResidentStatus: {
      type: String,
      enum: ["Owner", "Tenant"],
      require: true
    },
    Ownername: {
      type: String,
      required: function () {
        return this.ResidentStatus === "Tenant";
      },
    },
    OwnerPhone: {
      type: Number,
      required: function () {
        return this.ResidentStatus === "Tenant";
      },
    },
    OwnerAddress: {
      type: String,
      required: function () {
        return this.ResidentStatus === "Tenant";
      },
    },
    members: [
      {
        fullName: {
          type: String,
          // require: true
        },
        phone: {
          type: String,
          // require: true
        },
        email: {
          type: String,
          // require: true,
          match: [/^\S+@\S+\.\S+$/]
        },
        age: {
          type: String,
          // require: true
        },
        gender: {
          type: String,
          enum: ["Male", "Female", "Other"],
          // require: true
        },
        Relation: {
          type: String,
          // require: true
        },
      }
    ],
    vehicles: [{
      type: {
        type: String,
        // require: true
      },
      name: {
        type: String,
        // require: true
      },
      number: {
        type: String,
        // require: true
      }
    }],
    Password: {
      type: String,
      require: true
    },
    Role: {
      type: String,
      default: 'Resident',
      require: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manager'
    },
    Society: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Society'
    },
    OTP: {
      type: Number,
      default: null,
      // required: true
    }
  },
  {
    timestamps: true,
  }
);


const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;

