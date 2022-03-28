const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.postPost = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();

    // checks if a string represents valid hex
    // from https://www.sitepoint.com/community/t/how-to-check-if-string-is-hexadecimal/162739
    const regex = /[0-9A-Fa-f]{24}/g;

    if (req.params.postId.length !== 24) {
      res.status(400).send('invalid postID : expected 12 bytes or 24 hex characters');
      return;
    }

    if (!regex.test(req.params.postId)) {
      res.status(400).send('invalid postID : expected hex value');
      regex.lastIndex = 0; // reset index after use
      return;
    }

    dbConnect
      .collection('Posts')
      .find({ _id: ObjectId(req.params.postId) })
      .toArray((err, result) => {
        if (err) {
          res.status(400).send('Error updating post');
        } else if (result.length <= 0) {
          res.status(404).send('post does not exist');
        } else {
          dbConnect
            .collection('PostEvents')
            .insertOne({
              type: 'edit',
              postID: ObjectId(req.params.postId),
              data: req.body,
              user: req.session.user.username,
              timestamp: new Date(),
            });
          res.sendStatus(200);
        }
      });
  } else {
    res.status(401).send("Can't PUT post, not logged in");
  }
};
