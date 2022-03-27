const connect = require('../database');

exports.getAvgRatings = (req, res) => {
  console.log(`getAvgRatings ${req.params.imdbID}`);
  const dbConnect = connect.getDb();
  dbConnect.collection('Ratings')
    .aggregate([{
      $match: {
        _id: req.params.imdbID.toString(),
      },
    }, {
      $group: {
        _id: '$imdbID',
        avg: {
          $avg: '$rating',
        },
        count: {
          $sum: 1,
        },
      },
    }, {
      $project: {
        _id: 0,
      },
    }])
    .toArray((err, result) => {
      if (err) {
        res.status(400).send(`Failed to find documents: ${err}`);
      } else {
        res.status(200).send(result);
      }
    });
};

exports.getUserRatings = (req, res) => {
  if (req.session.user) {
    console.log('getUserRatings');
    const dbConnect = connect.getDb();
    const { imdbID } = req.params;
    const { username } = req.session.user;
    dbConnect.collection('Ratings')
      .findOne({ imdbID, username }, { projection: { _id: 0, rating: 1 } }, (err, result) => {
        if (err) {
          res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
        } else {
          console.log('1 document updated');
          res.status(200).send(result);
        }
      });
  } else {
    res.status(401).send("Can't GET rating, not logged in");
  }
};
