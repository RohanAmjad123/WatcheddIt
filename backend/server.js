const express = require("express");
const session = require('express-session');
const connect = require("./database.js");
const getComments = require("./get/getComments.js");
const getPosts = require("./get/getPosts.js");
const getMedia = require("./get/getMedia.js");
const getRatings = require("./get/getRatings.js");
const postMedia = require("./post/postMedia");
const postComments = require("./post/postComments.js");
const postPosts = require("./post/postPosts.js");
const postRatings = require("./post/postRatings.js");
const signup = require("./post/postAccount.js");
const login = require("./get/createSession.js");
const login2 = require("./get/getAccount.js");

// const { send } = require("process");

const bp = require('body-parser')
const app = express();
var jsonParser = bp.json()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
connect.connect();
// connect.connectToWrite();

const cors = require("cors");
const { request, response } = require("express");
const { createSession } = require("./get/createSession.js");
const bodyParser = require("body-parser");
app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 7 * 24 * 3600 * 1000 // 30 minutes (d * h/d * s/h * ms/s) total = 7 days
    }
}));

app.use('/',function(req, res, next){
    console.log("A new request received at " + Date.now());
    next();
 });


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
    console.log("Pizza dog")
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

//
// Ratings ENDPOINTS
//

app.route('/api/:imdbID/ratings').get(function (req, res) {
    getRatings.getAvgRatings(req, res)
});

app.route('/api/:imdbID/ratings/:userID').get(function (req, res) {
    getRatings.getUserRatings(req, res)
});

app.route('/api/addRating').post(function (req, res) {
    postRatings.postRating(req, res)
});


// SIGN UP & LOGIN APIS

//sign up api
// Req body parameters:
// username
// password
app.post('/api/signup', jsonParser, function (req, res) {
    console.log("Attempting signup")
    signup.postAccount(req, res)
})

//login api
// Req body parameters:
// username
// password
app.route('/api/login').get(function (req, res) {
    console.log(req)
    res.send(req.body)
    //login2.getAccount(req, res)
})

// logout api
app.route('/api/logout').get(function (req, res) {
    console.log("Logging user out")
    req.session.destroy()
    res.redirect('/')
})


app.listen(3000, function () {
    console.log("server started on http://127.0.0.1:3000");
});


//rating endpoints:

// get movie rating 

// add rating

// get individual rating