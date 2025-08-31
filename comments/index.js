const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const status = "pending";

    const comments = commentsByPostId[req.params.id] || [];

    const newComment = { id: commentId, content, status };

    comments.push(newComment);

    commentsByPostId[req.params.id] = comments;

    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        ...newComment,
        postId: req.params.id,
      },
    });

    res.status(201).send(comments);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).send({ error: "Failed to create comment" });
  }
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
