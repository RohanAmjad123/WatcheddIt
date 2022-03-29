const { ObjectId } = require('mongodb');
const connect = require('../database');

exports.deletePost = (req, res) => {
  if (req.session.user || req.session.admin) {
    const dbConnect = connect.getDb();
    dbConnect
      .collection('PostEvents')
      .insertOne({
        type: 'delete',
        data: req.body,
        postID: ObjectId(req.params.postID),
        user: req.session.user.username,
        timestamp: new Date(),
      });

    res.sendStatus(200);
  } else {
    res.status(400).send("Can't DELETE post, not logged in");
  }
};
