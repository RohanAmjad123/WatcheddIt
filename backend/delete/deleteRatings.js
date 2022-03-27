const connect = require('../database');

exports.deleteRating = (req, res) => {
  if (req.session.user) {
    const dbConnect = connect.getDb();
    // dbConnect.collection("Ratings")
    //     .deleteOne({
    //         imdbID: req.params.imdbID,
    //         userID: ObjectId(req.session.user._id)
    //     }, function (err, result) {
    //         if (err) {
    //             res.status(400).send(`Error deleting listing with id ${req.params.imdbID}!`);
    //         } else {
    //             console.log("1 document deleted");
    //             res.sendStatus(200);
    //         }
    //     });

    dbConnect.collection('Ratings')
      .findOneAndDelete({
        imdbID: req.params.imdbID,
        username: req.session.user.username,
      }, (err, result) => {
        if (err) {
          res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
        } else {
          console.log('1 document updated');
          console.log(result);
          if (result.value === null) {
            return;
          }
          dbConnect.collection('Media')
            .findOne({
              imdbID: req.params.imdbID,
            }, { projection: { _id: 0, Ratings: 1 } }, (error, media) => {
              if (error) {
                res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
              } else {
                console.log('1 document updated');
                console.log(result);
                let finalRating;
                if (media.Ratings.total - 1 === 0) {
                  finalRating = 0;
                } else {
                  finalRating = (media.Ratings.avg * media.Ratings.total
                  - result.value.rating) / (media.Ratings.total - 1);
                }
                dbConnect.collection('Media')
                  .updateOne({
                    imdbID: req.params.imdbID,
                  }, {
                    $set: {
                      'Ratings.avg': (finalRating),
                      'Ratings.total': media.Ratings.total - 1,
                    },
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
      });
  } else {
    res.status(401).send("Can't DELETE rating, not logged in");
  }
};
