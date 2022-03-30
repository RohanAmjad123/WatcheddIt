const connect = require('../database');

exports.getMedia = (req, res) => {
  const dbConnect = connect.getDb();
  console.log(`Get Media: ${req.params.imdbID}`);
  console.log(req.session.user);
  dbConnect.collection('Media')
    .findOne({ imdbID: req.params.imdbID }, (err, result) => {
      if (err) {
        res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
      } else if (result == null) {
        res.status(400).send('No such requested imdbID was found');
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
              // fuzzy: {
              //     maxEdits: 1,
              // },
            },
          }, {
            autocomplete: {
              query: req.params.search,
              path: 'Title',
              // fuzzy: {
              //   maxEdits: 1,
              // },
            },
          }],
        },
      },
    }, {
      $limit: 5,
    }, {
      $project: {
        _id: 0,
        Title: 1,
        imdbID: 1,
        Poster: 1,
        Genre: 1,
        Plot: 1,
        Year: 1,
        // score: {$meta: "searchScore"}
      },
    }])
  // .aggregate([{
  //     $search: {
  //         index: 'SearchMedia',
  //         compound: {
  //             should: [{
  //                 text: {
  //                     query: req.params.search,
  //                     path: {
  //                         wildcard: '*',
  //                     },
  //                     fuzzy: {
  //                         maxEdits: 1,
  //                     },
  //                 },
  //             }, {
  //                 autocomplete: {
  //                     query: req.params.search,
  //                     path: 'Title',
  //                     fuzzy: {
  //                       maxEdits: 1,
  //                     },
  //                 },
  //             }],
  //         },
  //     },
  // }])
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
  // .aggregate([{
  //     $search: {
  //         index: 'SearchMedia',
  //         autocomplete: {
  //             query: req.params.search,
  //             path: 'Title',
  //             // fuzzy: {
  //             //     maxEdits: 2,
  //             // },
  //         },
  //     },
  // }])
    .toArray()
    .then((items) => {
      console.log(items);
      res.json(items);
    })
    .catch((err) => {
      console.error(`Failed to find documents: ${err}`);
    });
};
