const express = require("express");

const dbi = require("./database.js");

const getComments = require("./getComments.js");
const getPosts = require("./getPosts.js");
const getMovies = require("./getMovies.js");

const app = express();
app.use(express.json());

dbi.connectToServer();

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

app.route('/api/addMedia').post(function(req, res){
  const dbConnect = dbi.getDb();

    dbConnect
    .collection("media")
    .insertOne(req.body);

    res.sendStatus(200);
});

// Retrieves all posts (ObjectId) associated with a Movie Title. 
app.route('/api/media/:imdbID/posts/').get(function (req, res) {
    getPosts.getPosts(req, res)
});

// Retrieve all movies in the database
app.route('/api/media').get(function (req, res) {
    getMovies.getMovies(req, res)
});

// Retrieve movies from the database based on page number with limit of 10
app.route('/api/media/:page').get(function (req, res) {
    getMovies.getMoviePage(req, res)
});

// Retrieve the amount of movies in the database
app.route('/api/media-count/').get(function (req, res) {
    getMovies.getMovieCount(req, res)
});

app.listen(3000, function () {
    console.log("server started on http://127.0.0.1:3000");
});
