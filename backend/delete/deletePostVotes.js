const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.deletePostVote = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();
    dbConnect.collection('PostVotes')
      .deleteOne({
        postID: ObjectId(req.params.postID),
        username: req.session.user.username,
      }, (err, result) => {
        if (err) {
          res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
        } else {
          console.log('1 document updated');
          console.log(result);
          res.sendStatus(200);
        }
      });
  } else {
    res.status(401).send("Can't DELETE post vote, not logged in");
  }
};
