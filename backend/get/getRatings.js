const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getAvgRatings = (req, res) => {
    console.log("getAvgRatings " + req.params.imdbID)
    const dbConnect = connect.getDb();
    dbConnect.collection("Ratings")
        .aggregate([{
            '$group': {
                '_id': '$imdbID', 'avg': {
                    '$avg': '$rating'
                }
            }
        }, {
            '$match': {
                '_id': req.params.imdbID.toString()
            }
        }, {
            '$project': {
                '_id': 0
            }
        }])
        .toArray()
        .then(items => {
            res.json(items);
            res.sendStatus(200);
        })
        .catch(err => {
            console.error(`Failed to find documents: ${err}`)
            res.sendStatus(400);
        })
}

exports.getUserRatings = (req, res) => {
    if (req.session.user) {
        console.log('getUserRatings')
        const dbConnect = connect.getDb();
        const imdbID = req.params.imdbID;
        const userID = req.session.user._id;
        dbConnect.collection("Ratings")
            .find({"imdbID": imdbID, "userID": ObjectId(userID)}, {projection: {_id: 0, rating: 1}})
            .toArray()
            .then(items => {
                res.json(items);
                res.sendStatus(200);
            })
            .catch(err => {
                console.error(`Failed to find documents: ${err}`)
                res.sendStatus(400);
            })
    } else {
        res.status(401).send("Can't get ratings, no user privileges");
    }
}

