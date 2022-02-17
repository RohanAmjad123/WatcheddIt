const express = require("express");
const {MongoClient} = require("mongodb");
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
        // return callback(err);
      }

      dbConnection = db.db("sample_airbnb");
      console.log("Successfully connected to MongoDB.");

    //   return callback();
    });
};

function getDb() {
    return dbConnection;
};

app.listen(3000, function(){
    console.log("server started");
});

app.get('/', function(req, res){
    
    const dbConnect = getDb();
    const matchDocument = {
      listing_id: 10006542,
      last_modified: new Date(),
      session_id: 1,
      direction: "req.body.direction"
    };
  
    dbConnect
    .collection("listingsAndReviews")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

connectToServer();