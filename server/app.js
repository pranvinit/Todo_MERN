// configuring .env
require("dotenv").config();

const express = require("express");
const app = express();

// third-party package imports
const cors = require('cors')

// importing express-async-errors
// automatically handles all express async errors
require("express-async-errors");

// database imports
const connectDB = require("./db/connect");

// router imports
const todoRouter = require("./routes/todoRoutes");

// error middleware imports
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// setting express middleware
app.use(express.json());

// setting third-party middleware
app.use(cors());

// setting routers
app.use("/api/v1/todo", todoRouter);

// setting error middleware
// order is important
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
