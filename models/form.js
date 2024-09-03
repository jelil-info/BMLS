const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,

  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    trim: true,
    lowercase: true,

  },
  message: {
    type: String,
    trim: true,
    lowercase: true,

  },

  /*attachment: {
        type: String,
        data: Buffer
    }*/

});

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
