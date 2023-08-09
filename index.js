const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const app = express()
dotenv.config()
app.use(cors())

// using env variables to save port and connection string
const port = process.env.PORT || 8000
const connection_string = process.env.CONNECTION_STRING

// display welcome message on default route
app.get("/", (req, res) =>{
    res.send("Welcome to Sail Student Management Portal")
})

// listening to a port to start express server
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

// Api endpoint 
app.use("/api/v1/user/", usersRouter)

// MongoDB connection
mongoose.connect(connection_string)
.then(() =>{
    console.log("database connection successful");
})
.catch((error) =>{
    console.log("database connection failed" + error);
})