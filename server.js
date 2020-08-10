/*
app dependencies
 */
const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser");

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
app.get("/feeling", function (req, res) {
    res.send(JSON.stringify({
        'success': true,
        'data': projectData
    }));
})

// post data handler
app.post("/feeling", function (req, res) {
    const req_data = req.body,
        temp = req_data["temp"],
        content = req_data["content"],
        date = req_data["date"];
    // verify that all needed values are giving on the request
    if (temp && content && date) {
        projectData = {
            temp: temp,
            content: content,
            date: date
        }
        res.send(JSON.stringify({
            "success": true,
        }));
    } else {
        res.status(400).send(JSON.stringify({
            "success": false,
            "message": "Bad Request"
        }));
    }
})

/*
 Server Setup
 */
// use port 3001 for testing and 3000 for development
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});