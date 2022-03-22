const express = require("express");
const session = require('express-session');
const connect = require("./database.js");
const getComments = require("./get/getComments.js");
const getPosts = require("./get/getPosts.js");
const getMedia = require("./get/getMedia.js");
const getRatings = require("./get/getRatings.js");
const getAccount = require("./get/getAccount.js");
const getPostVote = require("./get/getPostVotes.js");

const postMedia = require("./post/postMedia");
const postComments = require("./post/postComments.js");
const postPosts = require("./post/postPosts.js");
const postRatings = require("./post/postRatings.js");
const postAccount = require("./post/postAccount.js");
const postPostVote = require("./post/postPostVotes.js");

const putComment = require("./put/putComment");
const putPost = require("./put/putPost");
const putMedia = require("./put/putMedia");
const putAccount = require("./put/putAccount");

const deleteComment = require("./delete/deleteComment.js");
const deletePost = require("./delete/deletePost.js");
const deleteMedia = require("./delete/deleteMedia.js");
const deleteAccount = require("./delete/deleteAccount.js");

const store = new session.MemoryStore();

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
    },
    store: store
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
app.route('/api/comment/add').post((req, res) => {
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
app.route('/api/comment/:postTitle/:postId/').get(function (req, res) {
    getComments.getComments(req, res)
});
app.route('/api/:postId/comments').get(function (req, res) {
    getComments.getComments(req, res)
});
//GET comments with limit
app.route('/api/comment/:postTitle/:postId/:limit').get(function (req, res) {
    getComments.getComments(req, res)
});
app.route('/api/comment/:postId/:limit').get(function (req, res) {
    getComments.getComments(req, res)
});

// PUT comment 
app.route('/api/post/update/:commentId').put((req, res) => {
    putComment.putComment(req, res);
});

// DELETE comment
app.route('/api/comment/delete/:commentId').delete((req, res) => {
    deleteComment.deleteComment(req, res);
});

//
// POSTS ENDPOINTS
//

// POST posts
app.route('/api/post/add').post((req, res) => {
    postPosts.postPost(req, res);
});

// GET all posts
app.route('/api/posts/:imdbID/').get(function (req, res) {
    getPosts.getAllPosts(req, res);
});

// GET Singular Post
app.route('/api/media/:imdbID/post/:postID/').get(function (req, res) {
    getPosts.getPost(req, res);
});

// PUT post 
app.route('/api/post/update/:postId').put((req, res) => {
    putPost.putPost(req, res);
});


// DELETE post
app.route('/api/post/delete/:postId').delete((req, res) => {
    deletePost.deletePost(req, res);
});

//
// MEDIA ENDPOINTS
//

// POST media
app.route('/api/media/add').post(function (req, res) {
    postMedia.postMedia(req, res);
});

// GET all media
app.route('/api/media').get(function (req, res) {
    getMedia.getAllMedia(req, res)
});

// GET single media
// *Sajid: This messed my routers up so I appended it with /media.
app.route('/api/media/:imdbID').get(function (req, res) {
    getMedia.getMedia(req, res)
});

// Retrieve movies from the database based on page number with limit of 10
app.route('/api/media/page/:page').get(function (req, res) {
    getMedia.getMediaPage(req, res)
});

// Retrieve the amount of movies in the database
app.route('/api/media-count').get(function (req, res) {
    getMedia.getMediaCount(req, res)
});

app.route('/api/media-categories').get(function (req, res) {
    getMedia.getMediaCategories(req, res)
});

app.route('/api/media-categories/:category').get(function (req, res) {
    getMedia.getMediaByCategory(req, res)
});

// PUT media 
app.route('/api/post/update/:media').put((req, res) => {
    putMedia.putMedia(req, res);
});

// DELETE media
app.route('/api/post/delete/:mediaId').delete((req, res) => {
    deleteMedia.deleteMedia(req, res);
});

//
// Ratings ENDPOINTS
//

app.route('/api/media/:imdbID/ratings').get(function (req, res) {
    getRatings.getAvgRatings(req, res)
});

app.route('/api/media/:imdbID/ratings/user').get(function (req, res) {
    getRatings.getUserRatings(req, res)
});

app.route('/api/media/:imdbID/ratings/user').post(function (req, res) {
    postRatings.postRating(req, res)
});

//
// Post Voting ENDPOINTS
//

app.route('/api/post/:postID/voting').get(function (req, res) {
    getPostVote.getPostVotes(req, res)
});

app.route('/api/post/:postID/voting/user').get(function (req, res) {
    getPostVote.getUserPostVotes(req, res)
});

app.route('/api/post/:postID/voting/user').post(function (req, res) {
    postPostVote.postPostVote(req, res)
});

// SIGN UP & LOGIN APIS

//sign up api
// Req body parameters:
// username
// password
app.route('/api/signup').post(function (req, res) {
    console.log("Attempting signup")
    postAccount.signup(req, res)
});

app.route('/api/login').post(function (req, res) {
    console.log("Attempting login")
    getAccount.login(req, res)
});

// logout api
app.route('/api/logout').post(function (req, res) {
    console.log("Logging user out")
    req.session.destroy()
    res.redirect('/')
});

// PUT account 
app.route('/api/post/update/:accountId').put((req, res) => {
    putAccount.putAccount(req, res);
});


// remove account
app.route('/api/post/delete/:accountId').delete((req, res) => {
    deleteAccount.deleteAccount(req, res);
});


app.listen(3000, function () {
    console.log("server started on http://127.0.0.1:3000");
});
