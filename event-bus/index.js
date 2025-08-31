const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  try {
    // Forward the event to the appropriate service
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
    await axios.post("http://localhost:4003/events", event);
  } catch (err) {
    console.error("Error forwarding event:", err);
  }

  res.send({ status: "OK" });
});

// global error handler
app.use((err, req, res, next) => {
  res.status(500).send({ error: "Something went wrong" });
});

app.listen(4005, () => {
  console.log("Event bus listening on port 4005");
});
