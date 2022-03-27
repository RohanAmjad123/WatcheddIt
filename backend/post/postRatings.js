const { Double } = require('mongodb');
const connect = require('../database');

exports.postRating = (req, res) => {
  if (req.session.user) {
    if (req.body.rating < 1 || req.body.rating > 5) {
      res.status(400).send('Error - Invalid Rating Value');
      return;
    }
    console.log('Add Ratings');
    const dbConnect = connect.getDb();

    // adding rating to the Ratings collection
    dbConnect.collection('Ratings')
      .insertOne({
        imdbID: req.params.imdbID,
        username: req.session.user.username,
        rating: req.body.rating,
      }, (err) => {
        if (err) {
          res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
        } else {
          console.log('1 document updated');
          // updating the specific medias avg and total
          // dbConnect.collection("Media")
          //     .updateOne({
          //         imdbID: req.params.imdbID
          //     }, {
          //         $inc: {'Ratings.total': req.body.rating,'Ratings.count': 1},
          //     }, (err, result) => {
          //         if (err) {
          //             res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
          //         } else {
          //             console.log("1 document updated");
          //             res.sendStatus(200);
          //         }
          //     });

          // dbConnect.collection("Media")
          //     .aggregate([{
          //         '$addFields': {
          //             'Ratings.avg': {
          //                 '$divide': [
          //                     {
          //                         '$add': [
          //                             {
          //                                 '$multiply': ['$Ratings.avg', '$Ratings.count']
          //                             }, parseInt(req.body.rating)
          //                         ]
          //                     }, {
          //                         '$add': ['$Ratings.count', 1]
          //                     }
          //                 ]
          //             },
          //             'Ratings.count': {
          //                 '$add': ['$Ratings.count', 1]
          //             }
          //         }
          //     }])
          //     .toArray()
          //     .then(items => {
          //         console.log("1 document updated");
          //         res.status(200).send(items);
          //         // res.sendStatus(200);
          //     })
          //     .catch(err => {
          //         console.log(err)
          //         res.status(400).send(err);
          //     })

          dbConnect.collection('Media')
            .findOne({
              imdbID: req.params.imdbID,
            }, { projection: { _id: 0, Ratings: 1 } }, (error, result) => {
              if (error) {
                res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
              } else {
                console.log('1 document updated');
                console.log(result);
                dbConnect.collection('Media')
                  .updateOne({
                    imdbID: req.params.imdbID,
                  }, {
                    $set: {
                      'Ratings.avg': Double((result.Ratings.avg * result.Ratings.total + req.body.rating) / (result.Ratings.total + 1)),
                      'Ratings.total': result.Ratings.total + 1,
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
    res.status(401).send("Can't POST rating, not logged in");
  }
};
