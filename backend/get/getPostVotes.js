const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.getPostVotes = (req, res) => {
  console.log(`getPostVotes ${req.params.postID}`);
  const dbConnect = connect.getDb();
  dbConnect.collection('PostVotes')
    .aggregate([{
      $match: {
        postID: ObjectId(req.params.postID),
      },
    }, {
      $group: {
        _id: '$postID',
        upVote: {
          $sum: {
            $cond: [
              '$vote', 1, 0,
            ],
          },
        },
        downVote: {
          $sum: {
            $cond: [
              '$vote', 0, 1,
            ],
          },
        },
      },
    }, {
      $project: {
        _id: 0,
      },
    }])
    .toArray((err, result) => {
      if (err) {
        res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
      } else {
        console.log('1 document updated');
        res.status(200).json(result[0]);
      }
    });
};

exports.getUserPostVote = (req, res) => {
  if (req.session.user) {
    console.log('getUserPostVotes');
    const dbConnect = connect.getDb();
    dbConnect.collection('PostVotes')
      .findOne({
        postID: ObjectId(req.params.postID),
        username: req.session.user.username,
      }, {
        projection: { _id: 0, vote: 1 },
      }, (err, result) => {
        if (err) {
          res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
        } else {
          res.status(200).send(result);
        }
      });
  } else {
    res.status(401).send("Can't GET post vote, not logged in");
  }
};
