/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
if (process.argv.length > 5) {
  print("Name and number have to be in one part each, add them as a string.");
  process.exit(1);
}
if (process.argv.length === 3) {
  console.log("Phonebook:");
  person.find({}).then((each) => {
    console.log(each.name, " ", each.number);
    mongoose.connection.close();
  });
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.5b9ob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String || Number,
  identifier: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
  identifier: Math.random(),
});

person.save().then((response) => {
  console.log("Person saved to the database.");
  mongoose.connection.close();
});
