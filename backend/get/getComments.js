const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.getComments = (req, res) => {
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

  // sets the limit based on whether :limit is defined in the url
  const limit = (parseInt(req.params.limit, 10)) ? parseInt(req.params.limit, 10) : 0;
  dbConnect
    .collection('Comments')
    .find({ postID: ObjectId(req.params.postId) })
    .limit(limit)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send('Error fetching comments!');
      } else if (result.length <= 0) {
        res.json(result).status(200);
      } else {
        res.json(result).status(200);
      }
    });
};
