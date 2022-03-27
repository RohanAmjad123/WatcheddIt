const { json } = require('body-parser');
const { ISODate } = require('mongodb');
const connect = require('../database.js');

exports.postPost = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();

    dbConnect
      .collection('commentEvents')
      .insertOne(json({
        type: 'delete',
        data: json({ text: '<<deleted>>' }),
        user: req.session.user.username,
        timestamp: new Date().toISOString(),
      }));

    res.sendStatus(200);
  } else {
    res.status(400).send("Can't PUT post, not logged in");
  }
};
