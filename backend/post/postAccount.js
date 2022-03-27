const bcrypt = require('bcrypt');
const connect = require('../database');

const saltRounds = 10;

exports.signup = (req, res) => {
  console.log('Registering an account');
  const dbConnect = connect.getDb();
  console.log(`dbconnect: ${dbConnect}`);
  bcrypt.hash(req.body.password, saltRounds, (err1, hash) => {
    dbConnect.collection('users').insertOne({
      username: req.body.username,
      password: hash,
      type: 'user',
      date: Date.now,
    }, (err, response) => {
      if (err) {
        console.log('Failed to register an account');
        res.status(409).send('Failure trying to register an account');
      } else {
        res.send(response);
      }
    });
    if (err1) throw err1;
  });
};
