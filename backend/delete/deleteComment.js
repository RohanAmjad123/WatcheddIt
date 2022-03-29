const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.deleteComment = (req, res) => {
  if (req.session.user || req.session.admin) {
    const dbConnect = connect.getDb();

    dbConnect
      .collection('CommentEvents')
      .insertOne({
        type: 'delete',
        commentID: ObjectId(req.params.commentID),
        data: { 
          text: '<<deleted>>',
          user: req.session.user.username,
          postID: ObjectId(req.params.commentID)
        },
        user: req.session.user.username,
        timestamp: new Date(),
      });

    res.sendStatus(200);
  } else {
    res.status(400).send("Can't Delete post, not logged in");
  }
};
