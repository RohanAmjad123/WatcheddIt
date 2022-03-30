const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.deleteComment = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();

    dbConnect
      .collection('CommentEvents')
      .insertOne({
        type: 'delete',
        commentID: ObjectId(req.params.commentID),
        data: {
          text: '<<deleted>>',
          user: req.session.user.username,
          postID: ObjectId(req.params.commentID),
        },
        user: req.session.user.username,
        timestamp: new Date(),
      }, (err) => {
        if (err) {
          res.status(400).send('Error deleting');
        } else {
          console.log('doc deleted');
        }
      });

    res.sendStatus(200);
  } else {
    res.status(400).send("Can't Delete comment, not logged in");
  }
};
