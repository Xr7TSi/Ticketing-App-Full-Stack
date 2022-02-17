require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");



// API security
app.use(helmet());

// handle CORS error
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// load routers
const userRouter = require("./src/routers/user.router");

const ticketRouter = require("./src/routers/ticket.router");
const tokensRouter = require("./src/routers/tokens.router");

app.use("/v1/user", userRouter);

app.use("/v1/ticket", ticketRouter);

app.use("/v1/tokens", tokensRouter);

// error handler
const handleError = require("./src/utils/errorHandler.js");

app.use("*", (req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use("*", (error, req, res, next) => {
  handleError(error, res);
});

const PORT = process.env.PORT || 5000;

// mongoDb connection
const CONNECTION_URL = process.env.CONNECTION_URL;




mongoose
  .connect(CONNECTION_URL, {
    useNEWUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err.message));

if (process.env.NODE_ENV !== "production") {
  const mDb = mongoose.connection;

  mDb.on("open", () => {
    console.log("MongoDB is connected");
  });

  mDb.on("error", (error) => {
    console.log("MongoDB error", error);
  });

  // morgan logs api calls to the terminal
  app.use(morgan("tiny"));
}
