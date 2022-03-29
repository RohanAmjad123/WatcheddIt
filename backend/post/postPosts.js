const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.postPost = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();
    console.log(`data payload is: ${JSON.stringify(req.body)}`);
    console.log(`user is: ${req.session.user.username}`);
    dbConnect
      .collection('PostEvents')
      .insertOne({
        type: 'post',
        postID: ObjectId(req.body.postID),
        data: req.body,
        user: req.session.user.username,
        timestamp: new Date(),
      }, (err) => {
        if (err) throw err;
        res.sendStatus(200);
      });
  } else {
    res.status(401).send("Can't POST post, not logged in");
  }
};
