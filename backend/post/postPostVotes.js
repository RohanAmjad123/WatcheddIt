const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.postPostVote = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();
    console.log('Add Post Vote');
    dbConnect.collection('PostVotes')
      .updateOne({
        postID: ObjectId(req.params.postID),
        username: req.session.user.username,
      }, {
        $set: { vote: req.body.vote },
      }, { upsert: true })
      .then((obj) => {
        console.log(`Updated: ${obj}`);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        res.status(400);
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
    res.status(401).send("Can't POST ratings, not logged in");
  }
};
