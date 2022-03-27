const { ObjectId } = require('mongodb');
const connect = require('../database.js');

exports.postComment = (req, res) => {
  if (req.session.user || req.session.admin) {
    const dbConnect = connect.getDb();
    dbConnect
      .collection('CommentEvents')
      .insertOne({
        type: 'post',
        commentID: ObjectId(),
        data: {
          text: req.body.text,
          user: req.body.user,
          postID: ObjectId(req.body.postID),
        },
        user: req.session.user.username,
        timestamp: new Date(),
      });

    res.sendStatus(200);
  } else {
    res.status(401).send("Can't POST comment, not logged in");
  }
};
