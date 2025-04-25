const  mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      require: true
    },
    Description: {
      type: String,
      require: true
    },
    Date: {
      type: Date,
      require: true
    },
    Amount: {
      type: Number,
      require: true
    },
    Bill: {
      type: String,
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



const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
