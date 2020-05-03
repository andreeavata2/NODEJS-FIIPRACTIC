const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    users: [{ id: 1, email: "asfas@asd,com" }]
  });
});

app.post("/users", (req, res) => {
  console.log(req.body);

  res.status(201).json({
    success: true,
    user: req.body
  })
});

app.listen(8000, () => console.log("started at 8000"));
