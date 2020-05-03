const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const db = require("./models");
const router = require("./routes");

const app = express();

dotenv.config();

app.use(bodyParser.json());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to database"));

app.use((req, res, next) => {
  req.db = db;

  next();
});

app.use("/", router);

app.listen(process.env.PORT);
