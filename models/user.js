const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const UserModel = mongoose.model("users", UserSchema, "UserDB");
module.exports = UserModel;
