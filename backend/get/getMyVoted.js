const connect = require('../database');

exports.getMyVoted = (req, res) => {
    if (!req.session.user && !req.session.admin)
    {
      res.status(401).send('');
      return;
    }
    var { username } = req.session.user;
    if (username == null)
    username  = req.session.admin;

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
      console.error(`Failed to find documents: ${err}`);
    });
};
