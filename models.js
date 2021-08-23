const mongoose = require("mongoose");
//create mongodb user model fields username, password, email, full_name, type, lecture_id
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  lecturer_id: {
    type: String,
  },
  isVerifed: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = { User };
