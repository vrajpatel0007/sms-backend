const  mongoose = require("mongoose");

const otherincomeSchema = new mongoose.Schema(
  {
    Title: {
        type: String,
        require: true
    },
    Date: {
        type: Date,
        require: true
    },
    Due_Date: {
        type: Date,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    Amount: {
        type: Number,
        require: true
    },
    TotalMember:{
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager'
    },
    Society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society'
    }
  },
  {
    timestamps: true,
  }
);



const Otherincome = mongoose.model("Otherincome", otherincomeSchema);

module.exports = Otherincome;
