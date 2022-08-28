let express = require('express');
let app = express();
var bodyParser = require('body-parser');
require("dotenv").config()

const midlwr = (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next();
}

app.use(midlwr);
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get ("/json", function (req, res) {
  res.send("Hello from middleware!")
});

app.get("/now", (req,res,next) => {
  req.time = new Date().toString();
  next();
},(req,res) => {
  res.send({
    time : req.time
  });
});


app.get("/:word/echo",(req,res) => {
  const {word} = req.params;
  res.json({
    echo : word
  });
});

app.get("/name", function (req, res)  {
  var firstname = req.query.first;
  var lastname = req.query.last;
  res.json({
    name : `${firstname} ${lastname}`
  });  
});


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", function (req, res)  {
  var string = req.body.first + " " + req.body.last;
  res.json({ 
    name : `${string}` 
  });
});

app.use("/public", express.static(__dirname + "/public"));
module.exports = app;

