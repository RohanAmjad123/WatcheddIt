const connect = require('../database');

exports.putMedia = (req) => {
  console.log('updating media');
  const dbConnect = connect.getDb();
  dbConnect.collection('media').updateOne(req.body);
};

