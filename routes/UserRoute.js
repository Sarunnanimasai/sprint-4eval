const express = require("express");
const userRoute = express.Router();
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoute.get("/", (req, res) => {
  res.send("This is Registration Page");
});

userRoute.post("/register", async (req, res) => {
  const { name, gender, email, password, age, city } = req.body;
  try {
    const findUser = await UserModel.find({ email });
    if (findUser.length === 0) {
      bcrypt.hash(password, 4, async (err, hashed) => {
        if (err) {
          res.send({ msg: err.message });
        } else {
          const newUser = new UserModel({
            name,
            gender,
            email,
            password: hashed,
            age,
            city,
          });
          await newUser.save();
          res.send({ msg: "Registration Success" });
        }
      });
    } else {
      res.send({ msg: "User already exist, please login" });
    }
  } catch (error) {
    res.send({ msg: err.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ email });
    if (findUser.email !== "") {
      bcrypt.compare(password, findUser.password, (err, decoded) => {
        if (decoded) {
          const token = jwt.sign({ userId: findUser.userId }, "mytoken");
          res.send({ msg: "Logged in Succesfully", token: token });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = { userRoute };
