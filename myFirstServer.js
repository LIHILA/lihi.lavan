var http = require('http')
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1>Hello World! </h1>')
// }).listen(8080)

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql = require ("./db.js");


// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true
}));


// simple route
app.get("/", (req, res) => {
res.json({ message: "Welcome to web course example application." });
});

// Create a route for getting all customers
app.get("/customers", function(req, res){
    sql.query("SELECT * FROM customers", (err, mysqlres) => {
    if (err) {
    console.log("error: ", err);
    res.status(400).send({message: "error in getting all customers: " + err});
    return;
    }
    console.log("got all customers...");
    res.send(mysqlres);
    return;
    });
    });

// set port, listen for requests
app.listen(8080, () => {
console.log("Server is running on port 8080.");
});

