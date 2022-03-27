const { ISODate } = require('mongodb');
const connect = require('../database.js');

exports.deleteMedia = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();

    dbConnect
      .collection('media')
      .deleteOne({ imdbID: req.params.imdbID }, (err, result) => {
        if (err) {
          res.status(400).send(`Error deleting listing with id ${req.params.imdbID}!`);
        } else {
          console.log('1 document deleted');
        }
      });

    res.sendStatus(200);
  } else {
    res.status(400).send("Can't DELETE media, not logged in");
  }
};
