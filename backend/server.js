const express = require("express");
const bodyParser = require("body-parser");
const getComments = require("./getComment.js");

const dbi = require("./database.js");
const  getPosts  = require("./getPosts.js");

var router = express.Router();

const app = express();

app.listen(3000, function(){
    console.log("server started");
});

app.get('/', function(req, res){
    
    const dbConnect = dbi.getDb();
    const matchDocument = {
    //   listing_id: 10006542,
    //   last_modified: new Date(),
    //   session_id: 1,
    //   direction: "req.body.direction"
    };
  
    dbConnect
    .collection("comments")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

app.route('/api/:media/:post/').get(function(req, res){getComments.getComments(req, res)});

app.route('/api/:post/').get(function(req, res){getComments.getComments(req, res)});


// Retrieves all posts (ObjectId) associated with a Movie Title. 
app.route('/api/media/:title/').get(function(req, res){getPosts.getPosts(req, res)});


dbi.connectToServer();