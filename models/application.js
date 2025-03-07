const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApplicationSchema = new mongoose.Schema({
  appname: { type: String, required: true },
  appusername: { type: String, required: true },
  apppassword: { type: String, required: true },
  userid: { type: String, required: true },
});

const AppModel = mongoose.model(
  "application",
  ApplicationSchema,
  "applicationDB"
);
module.exports = AppModel;
