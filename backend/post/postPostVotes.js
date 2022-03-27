const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.postPostVote = (req, res) => {
  if (req.session.user) {
    if (typeof req.body.vote !== 'boolean') {
      res.status(400).send('Error - Invalid Vote Value');
      return;
    }
    const dbConnect = connect.getDb();
    console.log('Add Post Vote');
    dbConnect.collection('PostVotes')
      .insertOne({
        postID: ObjectId(req.params.postID),
        username: req.session.user.username,
        vote: req.body.vote,
      }, (err, result) => {
        if (err) {
          res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
        } else {
          res.status(200).json(result);
        }
      });
    // dbConnect.collection("PostEvents")
    //     .insertOne({
    //         type: "update",
    //         postID: ObjectId(req.params.postID),
    //         data: {
    //         votes: {
    //         upvotes:0,
    //         downvotes:0
    //         }
    //         },
    //         user: req.session.user.username,
    //         timestamp: new Date()
    //     })
    //     .then((obj) => {
    //         console.log('Updated: ' + obj);
    //         res.sendStatus(200);
    //     })
    //     .catch((err) => {
    //         console.log('Error: ' + err);
    //         res.status(400);
    //     })
  } else {
    res.status(401).send("Can't POST post vote, not logged in");
  }
};
