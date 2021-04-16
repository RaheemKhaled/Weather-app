// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get("/getWeather", (req,res)=>{
    res.send(projectData);
})

app.post("/addWeather", (req, res)=>{
    res.send()
})

// Setup Server

const port = 3000;

const server = app.listen(`${port}` , listening) ; 

function listening (){
    console.log("server is running");
    console.log(`running on local host : ${port}`);
}

app.get('/all', data);
function data (req , res){
    res.send(projectData);
    projectData = [];
}


app.post('/all', sendData);
function sendData (req , res){
    console.log(req.body);
    newEntry = {
        data: req.body.data,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData.push(newEntry)
}