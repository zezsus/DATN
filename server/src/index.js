/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routers = require("./routers/index");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
routers(app);

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("connect database success!");
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
