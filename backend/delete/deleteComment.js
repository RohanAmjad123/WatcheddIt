const { json } = require('body-parser');
const connect = require('../database');

exports.deleteComment = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();

    dbConnect
      .collection('CommentEvents')
      .insertOne(json({
        type: 'delete',
        data: json({ text: '<<deleted>>' }),
        commentID: req.params.commentID,
        user: req.session.user.username,
        timestamp: new Date(),
      }));

    res.sendStatus(200);
  } else {
    res.status(400).send("Can't PUT post, not logged in");
  }
};
