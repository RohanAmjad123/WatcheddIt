const { response } = require('express');
const connect = require('../database.js');

exports.putMedia = (req, res) => {
  console.log('updating media');
  const dbConnect = connect.getDb();
  dbConnect.collection('media').updateOne(req.body);
};
