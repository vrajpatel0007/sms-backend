const  mongoose  = require("mongoose");

const importantnumberSchema = new mongoose.Schema(
  {
    Fullname: {
      type: String,
      require: true
    },
    Phonenumber: {
      type: Number,
      require: true
    },
    Work: {
      type: String,
      require: true
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


const Importantnumber = mongoose.model("Importantnumber", importantnumberSchema);

module.exports = Importantnumber;
