var express = require("express");
var app = express();

var PORT = 3000;

app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/home.html");
});

app.get("/enviarTexto", function (req, res) {
    res.sendFile(__dirname + "/sendtext.html");
});

app.get("/recibirTexto", function (req, res){
    res.sendFile(__dirname + "/receivetext.html");
});

app.get("/enviarImagen", function (req, res){
    res.sendFile(__dirname + "/sendImage.html");
});

app.get("/recibirImagen", function (req, res){
    res.sendFile(__dirname + "/receiveImage.html");
});


app.listen(PORT, function (err) {
    if(err) {
        console.log("No se pudo iniciar el servidor...");
    }
    console.log("Server running on port " + PORT);
});