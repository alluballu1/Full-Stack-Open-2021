const helper = require("../utils/user_helper");
const bcrypt = require("bcryptjs");
const supertest = require("supertest");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("salasana", 10);
    const user = new User({ username: "temp", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Alex",
      name: "Alex Porri",
      password: "qwert12345",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "temp",
      name: "superkäyttäjä",
      password: "salasana",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if the username is under 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "BA",
      name: "Big A",
      password: "password",
    };
    const result = await api.post("/api/users").send(newUser).expect(400);
    expect(result.body.error).toContain(
      "shorter than the minimum allowed length"
    );
  });
});
