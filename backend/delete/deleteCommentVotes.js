const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.deleteCommentVote = (req, res) => {
  if (req.session.user) {
    console.log(`deleteCommentVotes ${req.params.commentID}`);
    const dbConnect = connect.getDb();
    dbConnect.collection('CommentVotes')
      .deleteOne({
        commentID: ObjectId(req.params.commentID),
        username: req.session.user.username,
      }, (err, result) => {
        if (err) {
          res.status(400).send(`Error deleting comment vote ${req.params.commentID}`);
        } else {
          res.status(200).json(result);
        }
      });
  } else {
    res.status(401).send("Can't DELETE comment vote, not logged in");
  }
};
