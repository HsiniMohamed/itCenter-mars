//import mongoose module
const mongoose = require("mongoose");
//import mongoose unique Validator module

const uniqueValidator = require("mongoose-unique-validator");

// create user Shema
const groupeSchema = mongoose.Schema({
  name: String,
  coursId: String,
  teacherId: String,
  studentsId: [String],
});
groupeSchema.plugin(uniqueValidator);

// create model name
const groupe = mongoose.model("Groupe", groupeSchema);

//make user exportable
module.exports = groupe;
