// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const { find, findById } = require("./users/model");

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

module.exports = server; // EXPORT YOUR SERVER instead of {}
