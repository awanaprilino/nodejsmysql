const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("./public"));
app.use(morgan("short"));
app.use(bodyParser.urlencoded({ express: false }));

// Root Route
app.get("/", function (req, res) {
  res.send("Hello World");
});

// API ROUTING
app.use("/api/users", require("./routes/api/users"));

// Localhost:3000
app.listen(3000);
