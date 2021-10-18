
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app        = express();
const cors       = require('cors');
const bodyParser = require('body-parser');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable All Cors Request
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup Server
app.get('/all', (req, res) => {
    return res.status(200).send(projectData)
});

const postData = (req, res) => {
    projectData = req.body;
    res.status(200).send(projectData);  
};

app.post('/add', postData);

const port      = 4000;
const hostname  = "127.0.0.1";

const listening = () => {
    console.log(`Server running at http://${hostname}:${port}/`);
};

app.listen(port, listening);