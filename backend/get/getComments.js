const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.getComments = (req, res) => {
  const dbConnect = connect.getDb();

  // sets the limit based on whether :limit is defined in the url
  const limit = (parseInt(req.params.limit, 10)) ? parseInt(req.params.limit, 10) : 10;

  dbConnect
    .collection('Comments')
    .find({ postID: ObjectId(req.params.postId) }, { projection: { _id: 0 } })
    // .limit(limit)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send('Error fetching comments!');
      } else {
        res.json(result);
      }
    });

  // console.log(req.params.media);
  console.log(limit);
  // res.send(req.params.media + req.params.post);
};
