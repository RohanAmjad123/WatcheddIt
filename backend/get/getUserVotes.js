const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getUserVotes = (req, res) => {
    const username = req.session.user.username
    console.log("The user's username is: " + username)
    const dbConnect = connect.getDb();
    dbConnect.collection("Ratings")
    .aggregate([{
        '$match': {
            'username': username
        }
    }, {
        '$project': {
            '_id': 0,
            'imdbID': 1,
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