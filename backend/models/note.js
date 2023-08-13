//import mongoose module
const mongoose = require("mongoose");
//import mongoose unique Validator module

const uniqueValidator = require("mongoose-unique-validator");

// create user Shema
const noteSchema = mongoose.Schema({
  groupeId: String,
  coursId: String,
  teacherId: String,
  studentId: String,
  evaluation: String,
  note: Number,
});
noteSchema.plugin(uniqueValidator);

// create model name
const note = mongoose.model("Note", noteSchema);

//make user exportable
module.exports = note;
