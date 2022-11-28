const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/route");

const app = express();
app.use(bodyParser.json());
app.use(routes);
mongoose.connect(
  "mongodb+srv://Popoola:prayer1020@cluster0.mbbmo7d.mongodb.net/banao?retryWrites=true&w=majority"
);

module.exports = app
// .then((data) => {
//   console.log("Connected");
//   app.listen("5000");
// })
// .catch((err) => {
//   console.log("Got an error", err);
// });
