const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getAvgRatings = (req, res) => {
    const dbConnect = connect.getDb();
    console.log("getAvgRatings " + req.params.imdbID)
    dbConnect.collection("ratings").aggregate([{
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
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
}

exports.getUserRatings = (req, res) => {
    console.log('getUserRatings')
    const dbConnect = connect.getDb();
    const imdbID = req.params.imdbID;
    const userID = req.params.userID;
    dbConnect
        .collection("ratings")
        .find({"imdbID": imdbID, "userID": ObjectId(userID)}, {projection: {_id: 0, rating: 1}})
        .toArray()
        .then(items => {
            res.json(items);
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))

}

