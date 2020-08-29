var express = require('express');
var path = require('path');
const fs = require('fs');
const request = require('request');
let rawdata = fs.readFileSync('../data.json');
let json = JSON.parse(rawdata);
var pedidos = [];
//SERVER
var app = express();
//Plantilla de nodejs
app.set("view engine","jade"); 

//-------------------------------------------------
//------------------ Middleware -------------------
//-------------------------------------------------
//peticiones application /json
app.use(express.urlencoded({ extended: true }));    
app.use(express.json()); 
//carpeta publica para los usuarios
app.use("/public",express.static(path.join(__dirname,'/public'))); 


//Metodo GET para renderizar el formulario
app.get('/', function (req, res) {     
    res.render('home', { userlist : json , msm:'',pedidos : pedidos});
});

//Metodo POST para pedir
app.post('/', function (req, res) { 
    for (let key in json) {
        if (json[key].ID == req.body.id) {
            var datos = {
                ID: json[key].ID,
                restaurante: json[key].restaurante,
                Combo: json[key].Combo,
                Descripcion: json[key].Descripcion,
                precio: json[key].precio
            };
            break;
        }
    }
    
    var options = {
        hostname: '127.0.0.1',
        url: 'http://localhost:8000/ingreso',
        port: 8000,
        path: '/ingreso',
        method: 'POST',
        json: datos
    }
    
    request(options, function(err, re, body){
        if (err) { 
            res.render('home', { userlist : json, msm:'ERROR' ,pedidos : pedidos});
        }
        if(body.status == 200){
            pedidos = body.pedido;
            res.render('home', { userlist : json, msm:'Ingreso Correcto' ,pedidos : pedidos});
        }
        else{
            res.render('home', { userlist : json, msm:'ERROR', pedidos : pedidos});
        }
        
    });
});

//Puerto 3000 donde se inicia el server
app.listen(3000, function () {
    console.log('Cliente en puerto 3000!');
});