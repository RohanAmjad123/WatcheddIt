const connect = require('../database');

exports.putRating = (req, res) => {
  if (req.session.user) {
    if (req.body.rating < 1 || req.body.rating > 5) {
      res.status(400).send('Error - Invalid Rating Value');
      return;
    }
    console.log('Update Rating');
    const dbConnect = connect.getDb();
    dbConnect.collection('Ratings')
      .findOneAndUpdate(
        {
          imdbID: req.params.imdbID,
          username: req.session.user.username,
        },
        {
          $set: { rating: req.body.rating },
        },
        (err, result) => {
          if (err) {
            console.error(`Failed to find documents: ${err}`);
            res.status(400).send('Error updating Rating');
          } else {
            console.log('Rating updated');
            if (result.value === null) {
              return;
            }
            // dbConnect.collection("Media")
            // .updateOne({
            //     imdbID: req.params.imdbID
            // }, {
            // eslint-disable-next-line max-len
            //     $inc: {'Ratings.total': parseInt(req.body.rating) - parseInt(result.value.rating)},
            // }, (err, result) => {
            //     if (err) {
            //         console.log(err)
            //         res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
            //     } else {
            //         console.log("1 document updated");
            //         res.sendStatus(200);
            //     }
            // });

            dbConnect.collection('Media')
              .findOne({
                imdbID: req.params.imdbID,
              }, { projection: { _id: 0, Ratings: 1 } }, (error, media) => {
                if (error) {
                  res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
                } else {
                  console.log('1 document updated');
                  dbConnect.collection('Media')
                    .updateOne({
                      imdbID: req.params.imdbID,
                    }, {
                      $set: { 'Ratings.avg': media.Ratings.avg + (req.body.rating - result.value.rating) / media.Ratings.total },
                    }, (error2) => {
                      if (error2) {
                        res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
                      } else {
                        console.log('1 document updated');
                        res.sendStatus(200);
                      }
                    });
                }
              });
          }
        },
      );
  } else {
    res.status(401).send("Can't PUT rating, not logged in");
  }
};
