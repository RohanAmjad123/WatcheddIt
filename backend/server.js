const express = require("express");
const bodyParser = require("body-parser");
const getComments = require("./getComments.js");

const dbi = require("./database.js");
const  getPosts  = require("./getPosts.js");

dbi.connectToServer();

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

// examples:
// retrieves all comments for a post with a given id:
//   /api/Title/620da70c1cfcdb12af569d91/comments/
//   /api/620da70c1cfcdb12af569d91/comments/

//gives the option to specify a limit on the comments retrieved:
//   /api/Title/620da70c1cfcdb12af569d91/comments/2
//   /api/620da70c1cfcdb12af569d91/comments/105

// title is not used but might be good for clarity for users (limit defaults to inf)
app.route('/api/:postTitle/:postId/comments').get(function(req, res){getComments.getComments(req, res)});
app.route('/api/:postId/comments').get(function(req, res){getComments.getComments(req, res)});
app.route('/api/:postTitle/:postId/comments/:limit').get(function(req, res){getComments.getComments(req, res)});
app.route('/api/:postId/comments/:limit').get(function(req, res){getComments.getComments(req, res)});


// Retrieves all posts (ObjectId) associated with a Movie Title. 
app.route('/api/media/:title/posts/').get(function(req, res){getPosts.getPosts(req, res)});
