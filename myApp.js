require("dotenv").config();
let express = require("express");
let app = express();

app.use(function middleWare(req, res, next) {
  console.log(req.method, req.path, " - ", req.ip);
  next();
});
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
// app.get("/", (req, res) => res.send("Hello Express"));

// chain a middleware function to add current time
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => res.json({ time: req.time })
);
const carrots = {
  snack: "carrots 🥕",
  profile: "crunchy",
  amount: 7,
  success: "YES",
};
app.get("/carrots", (req, res) => {
  console.log("CARROTS!");
  //   console.log(res.headers);
  res.json(carrots);
});
// build an echo server
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

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
