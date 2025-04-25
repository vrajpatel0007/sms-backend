const  mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
  {
    Firstname: {
      type: String,
      require: true
    },
    Lastname: {
      type: String,
      require: true
    },
    Email: {
      type: String,
      require: true
    },
    Number: {
      type: Number,
      require: true
    },
    Country: {
      type: String,
      require: true
    },
    State: {
      type: String,
      require: true
    },
    society:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Society'
    },
    City: {
      type: String,
      require: true
    },
    Password: {
      type: String,
      require: true
    },
    Role:{
      type:String,
      default: 'Manager',
      require:true
    },
    Image:{
      type: String
    },
    OTP:{
      type: Number,
      default: null
    }
  },
  {
    timestamps: true,
  }
);



const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
