const express = require("express");
const postRoute = express.Router();
const { PostModel } = require("../models/PostModel");

postRoute.get("/", async (req, res) => {
  const userId = req.body.userId;
  try {
    const allPosts = await PostModel.find({ userId });
    res.send(allPosts);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

postRoute.post("/create", async (req, res) => {
  const post = req.body;
  try {
    const newPost = new PostModel(post);
    await newPost.save();
    res.send({ msg: "Post created" });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

postRoute.get("/top", async (req, res) => {
  const userId = req.body.userId;
  try {
    let max = -1;
    const findUser = await PostModel.find({ userId });
    findUser.map((el) => {
      if (el.no_of_comments > max) {
        max = no_of_comments;
      }
    });
    const that_post = await PostModel.find({ no_of_comments });
    if (max === that_post) {
      res.send({ msg: that_post });
    } else {
      res.send({ msg: "Unable to find the post" });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

postRoute.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  const userId = payload.userId;
  try {
    const findUser = await PostModel.findOne({ _id: Id });
    if (findUser.userId === userId) {
      await PostModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "Updated" });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

postRoute.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const userId = payload.userId;
  try {
    const findUser = await PostModel.findOne({ _id: Id });
    if (findUser.userId === userId) {
      await PostModel.findByIdAndDelete({ _id: Id });
      res.send({ msg: "Deleted" });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = { postRoute };
