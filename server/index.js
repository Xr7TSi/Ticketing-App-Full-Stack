// use .env file outside root directory.
require("dotenv").config({ path: "../../environment-variables/Ticketing-App/.env" });

// to use .env file in root directory
// require("dotenv").config();

// Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
const express = require("express");
const app = express();

// Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box
const mongoose = require("mongoose");
const cors = require("cors");

// Helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require("helmet");

// morgan logs api calls to the terminal
const morgan = require("morgan");



// API security  so more at https://helmetjs.github.io/
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

  
  app.use(morgan("tiny"));
}
