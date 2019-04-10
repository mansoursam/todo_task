const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  subject: String,
  task: String,
  date: String,
  time: String
});

module.exports = mongoose.model("Todo", modelSchema);
