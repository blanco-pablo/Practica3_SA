var express = require('express');
var path = require('path');
const fs = require('fs');
const request = require('request');
var app = express();

//peticiones application /json
app.use(express.urlencoded({ extended: true }));    
app.use(express.json()); 

//Metodo GET
app.get('/', function (req, res) {     
    res.send("ESB OK");
});

//Puerto 3000 donde se inicia el server
app.listen(443, function () {
    console.log('ESB en puerto 443!');
});