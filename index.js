const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const { coursesRoute } = require("./routes/courses");
const eventsRoute = require("./routes/events");
const { tasksRoute } = require("./routes/tasks");

const app = express();
dotenv.config();
app.use(cors());  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// // using env variables to save port and connection string
const port = process.env.PORT || 8000;
const connection_string = process.env.CONNECTION_STRING;

// display welcome message on default route
app.get("/", (req, res) => {
  res.send("Welcome to Sail Student Management Portal");
});

// listening to a port to start express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Api endpoint
app.use("/api/v1/user/", usersRouter);
app.use("/api/v1/courses/", coursesRoute);
app.use("/api/v1/events/", eventsRoute);
app.use("/api/v1/tasks/", tasksRoute)
// MongoDB connection
mongoose
  .connect(connection_string)
  .then(() => {
    console.log("database connection successful");
  })
  .catch((error) => {
    console.log("database connection failed" + error);
  });
