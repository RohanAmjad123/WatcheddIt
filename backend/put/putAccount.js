const connect = require('../database');

exports.putUser = (req) => {
  console.log('updating account');
  const dbConnect = connect.getDb();
  dbConnect.collection('users').updateOne({
    username: req.body.username,
    password: req.body.password,
  });
};
