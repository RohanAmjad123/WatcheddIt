const connect = require('../database');

exports.getMyRatings = (req, res) => {
  if (!req.session.user) {
    res.status(401).send('You are currently not logged in');
    return;
  }
  const { username } = req.session.user;
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
      res.send([]);
      console.error(`Failed to find documents: ${err}`);
    });
};
