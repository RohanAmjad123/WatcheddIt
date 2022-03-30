const connect = require('../database');

exports.postMedia = (req, res) => {
  if (req.session.user && req.session.user.type === 'admin') {
    const dbConnect = connect.getDb();
    dbConnect
      .collection('Media')
      .insertOne({
        Title: req.body.Title,
        Poster: req.body.Poster,
        Plot: req.body.Plot,
        Year: req.body.Year,
        Genre: req.body.Genre,
        Ratings: {
          avg: 0,
          total: 0,
        },
        imdbID: req.body.imdbID,
      }, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(`Error posting media ${req.body.imdbID}`);
        } else {
          res.status(200).json(result);
        }
      });
  } else {
    res.status(401).send("Can't POST media, no admin privileges");
  }
};
