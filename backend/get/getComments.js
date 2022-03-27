const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.getComments = (req, res) => {
  const dbConnect = connect.getDb();

  // sets the limit based on whether :limit is defined in the url
  const limit = (parseInt(req.params.limit)) ? parseInt(req.params.limit) : 0;
  dbConnect
    .collection('Comments')
    .find({ postID: ObjectId(req.params.postId) })
    .limit(limit)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send('Error fetching comments!');
      } else {
        if(result.length == 0){
          res.status(400);
        }
        else{
          res.status(200);
        }
        res.json(result).send("comments fetched");
      }
    });
};
