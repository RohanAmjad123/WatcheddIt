const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.getMediaPosts = (req, res) => {
  const dbConnect = connect.getDb();
  const { imdbID } = req.params;
  console.log(`Get media posts : ${imdbID}`);
  dbConnect.collection('Posts')
    .find({ imdbID })
    .limit(100)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send('Error fetching posts!');
      } else {
        res.json(result);
      }
    });
  // console.log(req.params.Title);
};

exports.getAllPosts = (req, res) => {
  const dbConnect = connect.getDb();
  console.log('Get all posts');
  dbConnect.collection('Posts')
    .find()
    .toArray((err, result) => {
      if (err) {
        res.status(400).send('Error fetching posts!');
      } else {
        res.status(200).json(result);
      }
    });
};

exports.getPost = (req, res) => {
  const dbConnect = connect.getDb();
  const { imdbID } = req.params;
  dbConnect.collection('Posts')
    .findOne({ imdbID, _id: ObjectId(req.params.postID) }, (err, result) => {
      if (err) {
        res.status(400).send('Error fetching posts!');
      } else {
        res.status(200).json(result);
      }
    });
};
