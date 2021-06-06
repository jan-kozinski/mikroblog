const path = require("path");
const http = require("http");
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const app = express();

//CONFIG
const dotenv = process.env.NODE_ENV !== "production" ? require("dotenv") : null;

if (dotenv) {
  dotenv.config({ path: "./config/config.env" });
}

connectDB();
const PORT = process.env.PORT || 5000;
//SOCKET.IO WEBSOCKETS IMPLEMENTATION

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: process.env.CLIENT_DOMAIN },
});
//ROUTES

//MIDDLEWARE

app.use(helmet()); //helmet security headers
app.use(cors());
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
app.use("/api/like", require("./routes/like"));

//SEND HTML FILE IN PRODUCTION MODE
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//WEBSOCKETS
let connectedSockets = [];

io.on("connection", (socket) => {
  console.log("new ws connection: ", socket.id);
  socket.on("authorised-user-connected", (payload) => {
    console.log("authorised-user-connected ", payload.name);
    connectedSockets.push({ socket: socket.id, name: payload.name });
  });
  socket.on("new-post-added", () => socket.broadcast.emit("new-post-added"));

  socket.on("disconnect", (reason) => {
    console.log("ws connection closed");
  });
});

server.listen(
  PORT,
  console.log(
    `The server is running in ${process.env.NODE_ENV} mode and listening on port ${PORT}`
      .yellow.bold
  )
);
