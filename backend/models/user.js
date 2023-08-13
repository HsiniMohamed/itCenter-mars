//import mongoose module
const mongoose = require("mongoose");
//import mongoose unique Validator module

const uniqueValidator = require("mongoose-unique-validator");

// create user Shema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  tel: { type: String, unique: true },
  telChild: String,
  adresse: String,
  pwd: String,
  photo: String,
  cv: String,
  specialite: String,
  role: String,
  validity: String,
});
userSchema.plugin(uniqueValidator);

// create model name
const user = mongoose.model("User", userSchema);

//make user exportable
module.exports = user;
