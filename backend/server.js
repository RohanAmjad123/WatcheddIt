const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const connection = "mongodb+srv://user2:seng401@cluster0.bgqcz.mongodb.net/test";
const client = new MongoClient(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbconnection;

function connectToServer(callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("sample_airbnb");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
};

function getDb() {
    return dbConnection;
};

// app.listen(3000, function(){
//     console.log("server started");
// });

// app.get('/', function(req, res){
//     res.json({
//         status: 'API online',
//         message: 'Welcome'
//     });
// });