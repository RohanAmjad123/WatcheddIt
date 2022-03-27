const { ObjectId } = require('mongodb');
const connect = require('../database.js');

exports.getMyRatings = (req, res) => {
  const { username } = req.session.user;
  if (username == null) {
    res.status(400).send('You are currently not logged in');
  }
  console.log(`The user's username is: ${username}`);
  const dbConnect = connect.getDb();
  dbConnect.collection('Ratings')
    .aggregate([{
      $match: {
        username,
      },
    }, {
      $project: {
        _id: 0,
        imdbID: 1,
        rating: 1,
      },
    }])
    .toArray()
    .then((items) => {
      console.log(items);
      res.send(items);
    })
    .catch((err) => {
      console.error(`Failed to find documents: ${err}`);
    });
};
