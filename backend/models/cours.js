//import mongoose module
const mongoose = require("mongoose");
//import mongoose unique Validator module

const uniqueValidator = require("mongoose-unique-validator");

// create user Shema
const coursSchema = mongoose.Schema({
  name: String,
  description: String,
  duree: String,
  teacherId: String,
});
coursSchema.plugin(uniqueValidator);

// create model name
const cours = mongoose.model("Cours", coursSchema);

//make user exportable
module.exports = cours;
