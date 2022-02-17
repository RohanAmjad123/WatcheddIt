const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'react');

app.listen(3000, function(){
    console.log("server started");
});

app.get('/', function(req, res){
    res.json({
        status: 'API online',
        message: 'Welcome'
    });
});