// import app dependencies
const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser");

const port = 8000;


// Initialize an app instance
const app = express()

/*
Configuration
 */
// Use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/*
Routes
 */
app.get("/weather", function(req, res) {
    res.send("I am heree");
})

// Server Setup
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})