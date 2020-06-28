const express = require("express");
const connection = require("../../database/mysql");
const { restart } = require("nodemon");
const router = express.Router();

router.get("/", function (req, res) {
  // Get Data from Mysql to localhost:3000/api/users
  const queryString = "Select * from users";
  connection.query(queryString, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    const users = rows.map(function (row) {
      return {
        userId: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
      };
    });
    res.json(users);
  });
});

router.post("/", function (req, res) {
  //Post Data from Form.html and save it to Mysql
  console.log("Trying to create a new user ...");

  const firstName = req.body.first_name;
  const lastName = req.body.last_name;

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
  connection.query(queryString, [firstName, lastName], function (
    err,
    results,
    fields
  ) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log("Insert new user with id", results.insertId);
    res.redirect("/api/users");
  });
});

router.get("/:id", function (req, res) {
  // Get Data from Mysql to localhost:3000/api/users/id?
  const userId = req.params.id;
  const queryString = "Select * from users WHERE id = ?";
  connection.query(queryString, [userId], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log("Users fetch succesfully");
    const users = rows.map(function (row) {
      return {
        firstName: row.first_name,
        lastName: row.last_name,
      };
    });
    res.json(users);
  });
});

module.exports = router;
