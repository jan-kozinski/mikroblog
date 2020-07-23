const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
//const connectDB = require("./config/db");

//ROUTES

//CONFIG
//dotenv.config({ path: "./config/config.env" });
//connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

//MIDDLEWARE
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//ROUTES MIDDLEWARE
//app.use("/api/v1/transactions", transactions);

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
