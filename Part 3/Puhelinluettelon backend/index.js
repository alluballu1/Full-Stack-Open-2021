const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    if (tokens.method(req, res) === "POST") {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        JSON.stringify(req.body),
      ].join(" ");
    } else {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    }
  })
);
/* const http = require("http"); */

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelance",
    number: "123123123",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "1232131321",
    id: 3,
  },
  {
    name: "Mary Poppendick",
    number: "3453534535",
    id: 4,
  },
];

const generateID = () => {
  const maxId = persons.length > 0 ? persons[persons.length - 1].id + 1 : 1;
  return maxId;
};

app.get("/info", (request, response) => {
  const currentTime = new Date();
  const tempLength =
    "Phonebook has info for " + persons.length.toString() + " people";
  const data =
    "<div>" + tempLength + "</br>" + currentTime.toString() + "</div>";

  response.send(data);
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const phonebookItem = persons.find((item) => item.id === id);

  if (phonebookItem) {
    response.json(phonebookItem);
  } else {
    return response.status(404).send("404 Person not found").end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  items = persons.filter((item) => item.id !== id);
  persons = items;
  response.status(204).end();
});
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if ((body.number === undefined) | "" || (body.name === undefined) | "") {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (persons.some((element) => element.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const item = {
    name: body.name,
    number: body.number,
    id: generateID(),
    identifier: Math.random(),
  };

  persons = persons.concat(item);
  response.json(item);
});

/* const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(JSON.stringify(phonebook));
});
 */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
