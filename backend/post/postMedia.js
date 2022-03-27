const connect = require('../database');

exports.postMedia = (req, res) => {
  if (req.session.admin) {
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
      });

    res.sendStatus(200);
  } else {
    res.status(401).send("Can't POST media, no admin privileges");
  }
};
