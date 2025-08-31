const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  try {
    const { type, data: commentData } = req.body;

    if (type === "CommentCreated") {
      const status = commentData.content.includes("orange")
        ? "rejected"
        : "approved";

      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          ...commentData,
          status,
        },
      });
    }

    res.send({});
  } catch (err) {
    console.error("Error processing event:", err);
  }
});

app.listen(4003, () => {
  console.log("Moderation service listening on port 4003");
});
