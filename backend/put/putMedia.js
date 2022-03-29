const connect = require('../database');

exports.putMedia = (req, res) => {
  if (req.session.user && req.session.user.type === 'admin') {
    const dbConnect = connect.getDb();
    dbConnect.collection('Media').updateOne({imdbID: req.params.mediaId}, {$set: req.body}, { upsert: true });
    res.sendStatus(200);
  }
};
