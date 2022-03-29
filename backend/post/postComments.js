const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.postComment = (req, res) => {
  if (req.session.user || req.session.admin) {
    // checks if a string represents valid hex
    // from https://www.sitepoint.com/community/t/how-to-check-if-string-is-hexadecimal/162739
    const regex = /[0-9A-Fa-f]{24}/g;

    if (!regex.test(req.params.postId)) {
      res.status(400).send('invalid postID');
      regex.lastIndex = 0; // reset index after use
      return;
    }

    const dbConnect = connect.getDb();
    dbConnect
      .collection('CommentEvents')
      .insertOne({
        type: 'post',
        commentID: new ObjectId(req.body.commentID),
        data: {
          text: req.body.text,
          user: req.session.user.username,
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
