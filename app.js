var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const url = "mongodb+srv://admin:admin@cluster0.rxnpu.mongodb.net/contact-form";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/submit", (req, res) => {
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var address = req.body.address;

  var data = {
    email: email,
    firstname: firstname,
    lastname: lastname,
    address: address,
  };

  db.collection("contact").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });
  return res.redirect("success.html");
});

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  return res.redirect("index.html");
});

app.listen(3000, () => {
  console.log("Server is running");
});
