const express = require('express');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const bp = require('body-parser');
const connect = require('./database');
const swaggerFile = require('./swagger_output.json');

const login = require('./post/login');
const getMyRatings = require('./get/getMyRatings');

const getComments = require('./get/getComments');
const getPosts = require('./get/getPosts');
const getMedia = require('./get/getMedia');
const getRatings = require('./get/getRatings');
const getPostVote = require('./get/getPostVotes');
const myVotedPosts = require('./get/getMyVoted');

const postMedia = require('./post/postMedia');
const postComments = require('./post/postComments');
const postPosts = require('./post/postPosts');
const postRatings = require('./post/postRatings');
const postAccount = require('./post/postAccount');
const postPostVote = require('./post/postPostVotes');

const putComment = require('./put/putComment');
const putPost = require('./put/putPost');
const putRating = require('./put/putRatings');
const putPostVote = require('./put/putPostVotes');

const deleteComment = require('./delete/deleteComment');
const deletePost = require('./delete/deletePost');
const deleteRating = require('./delete/deleteRatings');
const deletePostVote = require('./delete/deletePostVotes');

const store = new session.MemoryStore();

// const { send } = require("process");

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

connect.connect().then(() => {
  app.listen(3000, () => {
    console.log('server started on http://127.0.0.1:3000');
    app.emit('app_started');
  });
});

// connect.connectToWrite();

app.use(cors({
  origin: ['http://localhost:3001', 'https://watcheddit.netlify.app', 'https://watcheddit.vercel.app'],
  credentials: true,
}));

app.use(session({
  key: 'userId',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: true,
    maxAge: 1000 * 3600, // 1 hour
  },
  store,
}));

app.use('/', (req, res, next) => {
  console.log(`A new request received at ${Date.now()}`);
  next();
});

// empty cookies for temporary API before
// login is implemented
app.get('/', (req, res) => {
  req.session.user = { name: 'user' };
  // req.session.admin = {name:"admin"};
  res.send('welcome');
});

//
// COMMENT ENDPOINTS
//

// POST comment
app.route('/api/comment/:postId/add').post((req, res) => {
  postComments.postComment(req, res);
});

// (limit defaults to inf)
// GET comments no limit
app.route('/api/comment/:postId').get((req, res) => {
  getComments.getComments(req, res);
});

app.route('/api/comment/:postId/:limit').get((req, res) => {
  getComments.getComments(req, res);
});

// PUT comment
app.route('/api/comment/update/:commentId').put((req, res) => {
  putComment.putComment(req, res);
});

// DELETE comment
app.route('/api/comment/delete/:commentID').post((req, res) => {
  deleteComment.deleteComment(req, res);
});

//
// POSTS ENDPOINTS
//

// POST posts
app.route('/api/post/add').post((req, res) => {
  postPosts.postPost(req, res);
});

// GET media posts
app.route('/api/posts/:imdbID/').get((req, res) => {
  getPosts.getMediaPosts(req, res);
});

// GET all posts
app.route('/api/posts/').get((req, res) => {
  getPosts.getAllPosts(req, res);
});

// GET Singular Post
app.route('/api/media/:imdbID/post/:postID/').get((req, res) => {
  getPosts.getPost(req, res);
});

// GET all the posts I voted on

app.route('/api/myvoted').get((req, res) => {
  myVotedPosts.getMyVoted(req, res);
});

// PUT post
app.route('/api/post/update/:postId').put((req, res) => {
  putPost.postPost(req, res);
});

// DELETE post
app.route('/api/post/delete/:postID').post((req, res) => {
  deletePost.deletePost(req, res);
});

//
// MEDIA ENDPOINTS
//

// POST media
app.route('/api/media/add').post((req, res) => {
  postMedia.postMedia(req, res);
});

// GET all media
app.route('/api/media').get((req, res) => {
  getMedia.getAllMedia(req, res);
});

// GET single media
// *Sajid: This messed my routers up so I appended it with /media.
app.route('/api/media/:imdbID').get((req, res) => {
  getMedia.getMedia(req, res);
});

app.route('/api/media-search/:search').get((req, res) => {
  getMedia.search(req, res);
});

//
// Ratings ENDPOINTS
//

app.route('/api/media/:imdbID/ratings').get((req, res) => {
  getRatings.getAvgRatings(req, res);
});

app.route('/api/media/:imdbID/ratings/user').get((req, res) => {
  getRatings.getUserRatings(req, res);
});

app.route('/api/media/:imdbID/ratings/user').post((req, res) => {
  postRatings.postRating(req, res);
});

app.route('/api/media/:imdbID/ratings/user').put((req, res) => {
  putRating.putRating(req, res);
});

app.route('/api/media/:imdbID/ratings/user').delete((req, res) => {
  deleteRating.deleteRating(req, res);
});

// response: [ { imdbID1, imdbID2, ...}]
// Gets all of the IMDB ID's that a user has voted on
app.route('/api/myratings/').get((req, res) => {
  getMyRatings.getMyRatings(req, res);
});

//
// Post Voting ENDPOINTS
//

app.route('/api/post/:postID/voting').get((req, res) => {
  getPostVote.getPostVotes(req, res);
});

app.route('/api/post/:postID/voting/user').get((req, res) => {
  getPostVote.getUserPostVote(req, res);
});

app.route('/api/post/:postID/voting/user').post((req, res) => {
  postPostVote.postPostVote(req, res);
});

app.route('/api/post/:postID/voting/user').put((req, res) => {
  putPostVote.putPostVote(req, res);
});

app.route('/api/post/:postID/voting/user').delete((req, res) => {
  deletePostVote.deletePostVote(req, res);
});

// SIGN UP & LOGIN APIS

// sign up api
// Req body parameters:
// username
// password
app.route('/api/signup').post((req, res) => {
  console.log('Attempting signup');
  postAccount.signup(req, res);
});

app.route('/api/login').post((req, res) => {
  console.log('Attempting login');
  login.login(req, res);
});

// logout api
app.route('/api/logout').post((req, res) => {
  console.log('Logging user out');
  req.session.destroy();
  res.redirect('/');
});

// // PUT account
// app.route('/api/post/update/:accountId').put((req, res) => {
//     putAccount.putAccount(req, res);
// });

// // remove account
// app.route('/api/post/delete/:accountId').delete((req, res) => {
//     deleteAccount.deleteAccount(req, res);
// });

// app.listen(3000, function () {
//     console.log("server started on http://127.0.0.1:3000");
// });

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
