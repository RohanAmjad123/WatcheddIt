const { response } = require('express');
const connect = require('../database.js');

exports.putUser = (req, res) => {
  console.log('updating account');
  const dbConnect = connect.getDb();
  dbConnect.collection('users').updateOne({
    username: req.body.username,
    password: req.body.password,
  });
};
