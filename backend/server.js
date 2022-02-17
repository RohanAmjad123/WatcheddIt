const express = require("express");

const dbi = require("./database.js");

const getComments = require("./getComment.js");
const getPosts = require("./getPosts.js");
const getMovies = require("./getMovies.js");

const app = express();

dbi.connectToServer();

// retrieves all comments for a given post. 
// two endpoints in case you want to include the name of the media in the url
app.route('/api/:media/:post/comments').get(function (req, res) {
    getComments.getComments(req, res)
});
app.route('/api/:post/comments').get(function (req, res) {
    getComments.getComments(req, res)
});

// Retrieves all posts (ObjectId) associated with a Movie Title. 
app.route('/api/media/:title/posts/').get(function (req, res) {
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