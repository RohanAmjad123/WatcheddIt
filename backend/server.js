const express = require("express");
const session = require('express-session');
// const dbi = require("./database.js");


const getComments = require("./get/getComments.js");
const getPosts = require("./get/getPosts.js");
const getMedia = require("./get/getMedia.js");
const postMedia = require("./post/postMedia");
const postComments = require("./post/postComments.js");
const postPosts = require("./post/postPosts.js");
// const { send } = require("process");

const app = express();
app.use(express.json());

// dbi.connectToServer();

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 7 * 24 * 3600 * 1000 // 30 minutes (d * h/d * s/h * ms/s) total = 7 days
    }
}));

// empty cookies for temporary API before
// login is implemented
app.get("/", function (req, res) {
    req.session.user = {name: "user"};
    // req.session.admin = {name:"admin"};
    res.send("welcome");
});

//
// COMMENT ENDPOINTS
//

// POST comment
app.route('/api/addComment').post((req, res) => {
    postComments.postComment(req, res);
});

// examples (move examples to documentation later):
// retrieves all comments for a post with a given id:
//   /api/Title/620da70c1cfcdb12af569d91/comments/
//   /api/620da70c1cfcdb12af569d91/comments/

//gives the option to specify a limit on the comments retrieved:
//   /api/Title/620da70c1cfcdb12af569d91/comments/2
//   /api/620da70c1cfcdb12af569d91/comments/105

// title is not used but might be good for clarity for users (limit defaults to inf)
// GET comments no limit
app.route('/api/:postTitle/:postId/comments').get(function (req, res) {
    getComments.getComments(req, res)
});
app.route('/api/:postId/comments').get(function (req, res) {
    getComments.getComments(req, res)
});
//GET comments with limit
app.route('/api/:postTitle/:postId/comments/:limit').get(function (req, res) {
    getComments.getComments(req, res)
});
app.route('/api/:postId/comments/:limit').get(function (req, res) {
    getComments.getComments(req, res)
});

//
// POSTS ENDPOINTS
//

// POST posts
app.route('/api/addPost').post((req, res) => {
    postPosts.postPost(req, res);
});

// GET all posts
app.route('/api/media/:imdbID/posts/').get(function (req, res) {
    getPosts.getAllPosts(req, res);
});

// GET Singular Post
app.route('/api/media/:imdbID/:postID/').get(function (req, res) {
    getPosts.getPost(req, res);
});

//
// MEDIA ENDPOINTS
//

// POST media
app.route('/api/addMedia').post(function (req, res) {
    postMedia.postMedia(req, res);
});

// GET all media
app.route('/api/media').get(function (req, res) {
    getMedia.getAllMedia(req, res)
});

// GET single media
app.route('/api/:imdbID').get(function (req, res) {
    getMedia.getMedia(req, res)
});

// Retrieve movies from the database based on page number with limit of 10
app.route('/api/media/:page').get(function (req, res) {
    getMedia.getMediaPage(req, res)
});

// Retrieve the amount of movies in the database
app.route('/api/media-count/').get(function (req, res) {
    getMedia.getMediaCount(req, res)
});

app.listen(3000, function () {
    console.log("server started on http://127.0.0.1:3000");
});
