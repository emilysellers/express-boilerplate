require("dotenv").config();
let express = require("express");
let app = express();

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
// app.get("/", (req, res) => res.send("Hello Express"));
app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env["MESSAGE_STYLE"] === "uppercase") {
    res.json({
      message: message.toUpperCase(),
    });
  } else {
    res.json({
      message: message,
    });
  }
});

module.exports = app;
