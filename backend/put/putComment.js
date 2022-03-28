const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.putComment = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();

    // checks if a string represents valid hex
    // from https://www.sitepoint.com/community/t/how-to-check-if-string-is-hexadecimal/162739
    const regex = /[0-9A-Fa-f]{24}/g;

    if (req.params.commentId.length !== 24) {
      res.status(400).send('invalid postID : expected 12 bytes or 24 hex characters');
      return;
    }

    if (!regex.test(req.params.commentId)) {
      res.status(400).send('invalid postID : expected hex value');
      regex.lastIndex = 0; // reset index after use
      return;
    }

    dbConnect
      .collection('Comments')
      .find({ _id: ObjectId(req.params.commentId) })
      .toArray((err, result) => {
        if (err) {
          res.status(400).send('Error updating comment');
        } else if (result.length <= 0) {
          res.status(404).send('comment does not exist');
        } else {
          dbConnect
            .collection('CommentEvents')
            .insertOne({
              type: 'edit',
              commentID: ObjectId(req.params.commentId),
              data: {
                text: req.body.text,
                user: req.body.user,
                postID: ObjectId(req.body.postID),
              },
              user: req.session.user.username,
              timestamp: new Date(),
            });
          res.sendStatus(200);
        }
      });
  } else {
    res.status(401).send("Can't PUT comment, not logged in");
  }
};
