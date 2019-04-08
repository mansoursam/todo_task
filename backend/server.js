const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./model/todo");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const secret = require("./secret").MONGODB;
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
require("dotenv").config();

//* This is our backend connection to MongoDB database
mongoose.connect(process.env.MONGODB || secret, { useNewUrlParser: true });

//* Check if database is connected succesfully (or use promise)
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", () => console.error("Connection error"));

//* bodyparser to parse the request body in json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend", "build")));
//! This is our READ method
//* This method is to fetch all data from database
app.get("/getData", (req, res) => {
  Todo.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(data);
  });
});

//! This is UPDATE method
//* It overwrites existing data in our database
app.post("/updateData/:id", (req, res) => {
  console.log(req.body);
  let taskId = req.params.id;
  const query = Todo.findByIdAndUpdate(
    taskId,
    { $set: req.body },
    { new: true }
  );
  query.exec((err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("RESULT: " + result);
    res.send("Done");
  });
});

//! This is our DELETE method
//* This method removes existing data from our database
app.delete("/deleteData/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  const query = Todo.findByIdAndDelete(id);
  query.exec(err => {
    if (err) throw err;
    console.log("deleted");
    res.status(204).send();
  });
});

//!This is our CREATE method
//* This method adds new data in our database
app.post("/createData", (req, res) => {
  console.log(req.body);
  const { subject, task, date, time } = req.body;
  let query = new Todo({ subject, task, date, time });
  query.save((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.redirect("/");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
//! Listen on PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
