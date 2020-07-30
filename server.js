const path = require("path");
const helmet = require("helmet");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//ROUTES

//CONFIG
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/config.env" });
}
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

//MIDDLEWARE

app.use(helmet()); //helmet security headers

app.use(express.json()); // json bodyparser

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //morgan http requests logger
}

//ROUTES MIDDLEWARE

app.use("/api/mikroblog", require("./routes/posts"));
app.use("/api/users", require("./routes/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(
  PORT,
  console.log(
    `The server is running in ${process.env.NODE_ENV} mode and listening on port ${PORT}`
      .yellow.bold
  )
);
