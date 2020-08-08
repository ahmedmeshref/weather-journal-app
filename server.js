/*
app dependencies
 */
const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    port = 8000;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

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


/*
Routes
 */
// return projectData
app.get("/data", function(req, res) {
    res.send(JSON.stringify({
        'success': true,
        'data': projectData
    }));
})

// Server Setup
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})