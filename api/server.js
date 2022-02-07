// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const { find, findById, insert, update, remove } = require("./users/model");

server.use(express.json());

server.get("/", (req, res) => {
  res.json("hello world");
});

server.get("/api/users", (req, res) => {
  find()
    .then((user) => {
      res.json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  let { id } = req.params;
  findById(id)
    .then((user) => {
      if (user === null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

server.post("/api/users", (req, res) => {
  let body = req.body;
  if (!body.name) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else if (!body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    insert(body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

server.put("/api/users/:id", async (req, res) => {
  let body = req.body;
  let { id } = req.params;

  try {
    let user = await findById(id);
    if (user === null) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
      return;
    }

    if (!body.name || !body.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
      return;
    }

    let newUser = await update(id, body);
    res.status(200).json(newUser);
  } catch (e) {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
