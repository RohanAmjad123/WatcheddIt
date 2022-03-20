const connect = require("../database.js");

let pageLimit = 10

exports.getMedia = (req, res) => {
    const dbConnect = connect.getDb();
    console.log("Get Media: " + req.params.imdbID)
    console.log(req.session.user)
    // dbConnect
    //     .collection("Media")
    //     .find({"imdbID": req.params.imdbID})
    //     .toArray((err, result) => {
    //         if (err) {
    //             res.status(400).send("Error fetching media");
    //         } else {
    //             res.json(result);
    //         }
    //     });
    dbConnect.collection("Media").aggregate([{
        '$match': {
            'imdbID': req.params.imdbID
        }
    }, {
        '$lookup': {
            'from': 'Ratings', 'localField': 'imdbID', 'foreignField': 'imdbID', 'let': {
                'rating': '$rating'
            }, 'pipeline': [{
                '$group': {
                    '_id': '$imdbID', 'avg': {
                        '$avg': '$rating'
                    }, 'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$project': {
                    '_id': 0
                }
            }], 'as': 'ratings'
        }
    }, {
        '$unwind': {
            'path': '$ratings', 'preserveNullAndEmptyArrays': true
        }
    }])
        .toArray()
        .then(items => {
            // console.log(items)
            res.json(items);
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
}

exports.getAllMedia = (req, res) => {
    const dbConnect = connect.getDb()
    console.log("Get All Media")
    // dbConnect
    //     .collection("Media")
    //     .find()
    //     .toArray(function (err, result) {
    //         if (err) {
    //             res.status(400).send("Error fetching media!");
    //         } else {
    //             res.json(result);
    //         }
    //     });
    dbConnect.collection("Media").aggregate([{
        '$lookup': {
            'from': 'Ratings', 'localField': 'imdbID', 'foreignField': 'imdbID', 'let': {
                'rating': '$rating'
            }, 'pipeline': [{
                '$group': {
                    '_id': '$imdbID', 'avg': {
                        '$avg': '$rating'
                    }, 'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$project': {
                    '_id': 0
                }
            }], 'as': 'ratings'
        }
    }, {
        '$unwind': {
            'path': '$ratings', 'preserveNullAndEmptyArrays': true
        }
    }])
        .toArray()
        .then(items => {
            // console.log(items)
            res.json(items);
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))

}

exports.getMediaPage = (req, res) => {
    let pageNumber = parseInt(req.params.page) - 1

    const dbConnect = connect.getDb()

    dbConnect
        .collection("media")
        .find()
        .skip(pageNumber >= 0 ? (pageNumber) * pageLimit : 0)
        .limit(pageLimit)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching movies!");
            } else {
                res.json(result);
            }
        });
}

exports.getMediaCount = (req, res) => {
    const dbConnect = connect.getDb()

    dbConnect
        .collection("Media")
        .find()
        .count(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching movie count!");
            } else {
                res.json(result);
            }
        })
}

exports.getMediaByCategory = (req, res) => {
    const dbConnect = connect.getDb()
    dbConnect
        .collection("Media")
        // .find({"Genre":{$regex : req.params.category}})
        .find({"Genre": new RegExp(req.params.category,'i')})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching movies!");
            } else {
                res.json(result);
            }
        });
}

exports.getMediaCategories = (req, res) => {
    const dbConnect = connect.getDb()
    dbConnect.collection("Media").aggregate([
        {
            '$project': {
                '_id': 0,
                'imdbID': 1,
                'Genre': {
                    '$split': [
                        '$Genre', ', '
                    ]
                }
            }
        }, {
            '$unwind': {
                'path': '$Genre',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$group': {
                '_id': '$Genre',
                'Titles': {
                    '$addToSet': '$imdbID'
                }
            }
        }
    ])
        .toArray()
        .then(items => {
            // console.log(items)
            res.json(items);
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
}