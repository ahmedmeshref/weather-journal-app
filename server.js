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

// save given data into projectData
let saveData = (temp, content, date) => {
    // verify that all needed values are giving on the request
    if (temp && content && date) {
        projectData = {
            temp: temp,
            content: content,
            date: date
        }
        return true;
    } else {
        return false;
    }

}

// save data
app.post("/data", function (req, res) {
    let req_data = req.body,
        temp = req_data["temp"],
        content = req_data["content"],
        date = req_data["date"],
        saveData = saveData(temp, content, date);
    if (saveData){
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

// Server Setup
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})