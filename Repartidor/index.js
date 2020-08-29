var express = require('express');
var path = require('path');
const request = require('request');
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
    res.render('home', { msm:'',pedido : pedidos});

});

//Metodo POST para entregar pedido
app.post('/', function (req, res) { 
    var no = req.body.id;
    for (let key in pedidos) {
        if (pedidos[key].conta == no) {
            pedidos[key].estado = "Entregado";
            break;
        }
    }
    res.render('home', { msm:'',pedido : pedidos});

});
//Metodo POST para recibir pedidos
app.post('/ingreso', function (req, res) {
    pedidos.push(req.body);
    console.log(pedidos);
    res.status(200).json({status:200,pedido:pedidos});
});

//Puerto 3000 donde se inicia el server
app.listen(8080, function () {
    console.log('Repartidor en puerto 8080!');
  });