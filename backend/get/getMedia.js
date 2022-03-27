const connect = require('../database.js');

exports.getMedia = (req, res) => {
  const dbConnect = connect.getDb();
  console.log(`Get Media: ${req.params.imdbID}`);
  console.log(req.session.user);
  dbConnect.collection('Media')
    .findOne({ imdbID: req.params.imdbID }, (err, result) => {
      if (err) {
        res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
      } else {
        console.log('1 document updated');
        res.status(200).send(result);
      }
    });
  // .aggregate([{
  //     '$match': {
  //         'imdbID': req.params.imdbID
  //     }
  // }, {
  //     '$lookup': {
  //         'from': 'Ratings', 'localField': 'imdbID', 'foreignField': 'imdbID', 'let': {
  //             'rating': '$rating'
  //         }, 'pipeline': [{
  //             '$group': {
  //                 '_id': '$imdbID', 'avg': {
  //                     '$avg': '$rating'
  //                 }, 'count': {
  //                     '$sum': 1
  //                 }
  //             }
  //         }, {
  //             '$project': {
  //                 '_id': 0
  //             }
  //         }], 'as': 'ratings'
  //     }
  // }, {
  //     '$unwind': {
  //         'path': '$ratings', 'preserveNullAndEmptyArrays': true
  //     }
  // }])
  // .toArray()
  // .then(items => {
  //     res.json(items);
  // })
  // .catch(err => {
  //     console.error(`Failed to find documents: ${err}`)
  // })
};

exports.getAllMedia = (req, res) => {
  console.log('Get All Media');
  const dbConnect = connect.getDb();
  dbConnect.collection('Media')
    .find()
  // .aggregate([{
  //     '$lookup': {
  //         'from': 'Ratings', 'localField': 'imdbID', 'foreignField': 'imdbID', 'let': {
  //             'rating': '$rating'
  //         }, 'pipeline': [{
  //             '$group': {
  //                 '_id': '$imdbID', 'avg': {
  //                     '$avg': '$rating'
  //                 }, 'count': {
  //                     '$sum': 1
  //                 }
  //             }
  //         }, {
  //             '$project': {
  //                 '_id': 0
  //             }
  //         }], 'as': 'ratings'
  //     }
  // }, {
  //     '$unwind': {
  //         'path': '$ratings', 'preserveNullAndEmptyArrays': true
  //     }
  // }])
    .toArray()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.error(`Failed to find documents: ${err}`);
    });
};

const pageLimit = 10;
exports.getMediaPage = (req, res) => {
  const pageNumber = parseInt(req.params.page) - 1;
  const dbConnect = connect.getDb();
  dbConnect.collection('media')
    .find()
    .skip(pageNumber >= 0 ? (pageNumber) * pageLimit : 0)
    .limit(pageLimit)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send('Error fetching movies!');
      } else {
        res.json(result);
      }
    });
};

exports.getMediaCount = (req, res) => {
  const dbConnect = connect.getDb();
  dbConnect.collection('Media')
    .find()
    .count((err, result) => {
      if (err) {
        res.status(400).send('Error fetching movie count!');
      } else {
        res.json(result);
      }
    });
};

exports.getMediaByCategory = (req, res) => {
  const dbConnect = connect.getDb();
  dbConnect.collection('Media')
    .find({ Genre: new RegExp(req.params.category, 'i') })
    .toArray((err, result) => {
      if (err) {
        res.status(400).send('Error fetching movies!');
      } else {
        res.json(result);
      }
    });
};

exports.getMediaCategories = (req, res) => {
  const dbConnect = connect.getDb();
  dbConnect.collection('Media')
    .aggregate([{
      $project: {
        _id: 0,
        imdbID: 1,
        Genre: {
          $split: [
            '$Genre', ', ',
          ],
        },
      },
    }, {
      $unwind: {
        path: '$Genre',
        preserveNullAndEmptyArrays: true,
      },
    }, {
      $group: {
        _id: '$Genre',
        Titles: {
          $addToSet: '$imdbID',
        },
      },
    }])
    .toArray()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.error(`Failed to find documents: ${err}`);
    });
};

exports.search = (req, res) => {
  const dbConnect = connect.getDb();
  dbConnect.collection('Media')
    .aggregate([{
      $search: {
        index: 'SearchMedia',
        compound: {
          should: [{
            text: {
              query: req.params.search,
              path: {
                wildcard: '*',
              },
              fuzzy: {
                maxEdits: 2,
              },
            },
          }, {
            autocomplete: {
              query: req.params.search,
              path: 'Title',
              fuzzy: {
                maxEdits: 2,
              },
            },
          }],
        },
      },
    }])
  // .aggregate([{
  //     '$search': {
  //         'index': 'SearchMedia',
  //         'text': {
  //             'query': req.params.search,
  //             'path': {
  //                 'wildcard': '*'
  //             },
  //             'fuzzy':{
  //                 'maxEdits': 2
  //             }
  //         }
  //     }
  // }])
    .toArray()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.error(`Failed to find documents: ${err}`);
    });
};
