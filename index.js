const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const { coursesRoute } = require("./routes/courses");
const eventsRoute = require("./routes/events");
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc");
const { tasksRoute } = require("./routes/tasks");

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const options = {
//   definition: {
//     openapi: " 3.0.0",
//     info: {
//       title: " Sail Student Management Portal",
//       version: " 1.0.0",
//       description: "  a comprehensive web application designed to facilitate the efficient management of student-related information, academic records, events and administrative tasks within educational institutions. This portal serves as a centralized hub for students, teachers and administrators to interact with various aspects of the education process"
//     },
//     servers: [
//       {
//         url: "https://localhost:4000"
//       }
//     ],
//   },
//   apis: ["./routes/*.js"]
// }


// const specs =  swaggerJsDoc(options)

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
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
