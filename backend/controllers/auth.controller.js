const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create and Save a new User for register
exports.signup = (req, res) => {
    // Save User to Database
    User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {
        res.status(201).send({ message: "User was registered successfully!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

// Find a user for Login
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(404).send({ message: "Password Not match." });
      }

      const payload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(payload, config.secret, { expiresIn: "1d" });
      
      return res.status(200).send({ message: "Logged in successfully!", user: payload, token: "Bearer " + token });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id }})
  .then(user => {
    res.status(200).send({ message: "User with id=" + id +"deleted !"});
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({ message: "Could not delete Article with id=" + id });
  });
};