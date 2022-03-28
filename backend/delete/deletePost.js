const connect = require('../database');

exports.deletePost = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();

    dbConnect
      .collection('postEvents')
      .insertOne({
        type: 'delete',
        data: req.body,
        user: req.session.user.username,
        timestamp: new Date().toISOString(),
      });

    res.sendStatus(200);
  } else {
    res.status(400).send("Can't DELETE post, not logged in");
  }
};
