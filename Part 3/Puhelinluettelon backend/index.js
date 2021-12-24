/* eslint-disable no-undef */
require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

let persons = [];

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// info page

app.get("/info", (request, response) => {
  Person.count({}).then((value) => {
    const currentTime = new Date();
    const tempLength = "Phonebook has info for " + value + " people";
    const data =
      "<div>" + tempLength + "</br>" + currentTime.toString() + "</div>";
    response.send(data);
  });
});

// fetch all persons

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((err) => next(err));
});

// fetch specific person based on ID

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        person.status(404).end();
      }
    })
    .catch((err) => next(err));
});

// deletion

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      response.status(204).end();
    })
    .catch((err) => next(err));
  items = persons.filter((item) => item.id !== id);
  persons = items;
});

// posting a new person to the database

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.number || !body.name) {
    return response.status(400).json("Number or name is missing!");
  }
  const item = new Person({
    name: body.name,
    number: body.number,
  });
  item
    .save()
    .then((savedItem) => response.json(savedItem))
    .catch((err) => next(err));
});

// modifying an existing person's data

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((err) => next(err));
});

// error handler

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send("ID does not exist");
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
