const connect = require('../database');

exports.getMyVoted = (req, res) => {
  var { username } = req.session.user;
  if (username == null) username = req.session.admin
  if (username == null) {
    res.status(400).send('You are currently not logged in');
  }
  console.log(`The user's username is: ${username}`);
  const dbConnect = connect.getDb();
  dbConnect.collection('PostVotes')
    .aggregate([{
      $match: {
        username,
      },
    }, {
      $project: {
        _id: 0,
        type: 1,
        post: 1,
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
