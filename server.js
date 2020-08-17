const path = require("path");
const helmet = require("helmet");
const express = require("express");

const colors = require("colors");
const app = express();
const connectDB = require("./config/db");

//ROUTES

//CONFIG
const dotenv = process.env.NODE_ENV !== "production" ? require("dotenv") : null;

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/config.env" });
}

connectDB();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE

app.use(helmet()); //helmet security headers

app.use(express.json()); // json bodyparser
app.use(express.urlencoded({ extended: false }));

//morgan http requests logger
const morgan = process.env.NODE_ENV !== "production" ? require("morgan") : null;
if (morgan) {
  app.use(morgan("dev"));
}

//ROUTES MIDDLEWARE

app.use("/api/mikroblog", require("./routes/posts"));
app.use("/api/users", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));

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
