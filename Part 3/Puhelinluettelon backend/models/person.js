/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const uniequeValidator = require("mongoose-unique-validator");
const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then((result) => console.log("connected!"))
  .catch((err) => {
    console.log("There was an error when connecting to mongoDB", err.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3 },
  number: { type: String || Number, minlength: 8 },
});

personSchema.plugin(uniequeValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    console.log(returnedObject._id.toString());
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
