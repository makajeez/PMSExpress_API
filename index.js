const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const { User } = require("./models");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to the database"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// retrieve isVerified from user
app.get("/api/users/:id", (req, res) => {
    User.find({type: 'lecturer', isVerified: true}.then(users => {
        res.json(users);
    }).catch(err => {
        console.log({err});
    }))
});

app.post("/user/registration", (req, res) => {
  const userData = req.body;
  User.create(userData)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

//login controller
app.post("/user/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.status(200).json({ user });
      } else {
        res.status(401).send({
          message: "Invalid username or password",
        });
      }
    }
  });
});

//update user isVerified
app.put("/user/isVerified", (req, res) => {
  const { username, isVerified } = req.body;
  User.findOne({ username }).then((user) => {
    if (user) {
      if (isVerified) {
        user.isVerified = true;
        user.save().then((user) => {
          return res.status(200).json({ user });
        });
      }
      user.remove().then((user) => {
        res.status(200).json({ user });
      });
    }
  });
});


const PORT = 8888;
app.listen(PORT, () => {
  console.log("Running on port", +PORT);
});
