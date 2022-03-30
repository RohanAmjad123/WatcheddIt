const connect = require('../database');

exports.getMyVoted = (req, res) => {
  console.log(req.session.user);
  if (!req.session.user) {
    res.status(401).send('You are currently not logged in');
    return;
  }
  const { username } = req.session.user;

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
        vote: 1,
        postID: 1,
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
