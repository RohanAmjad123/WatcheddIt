const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getMyRatings = (req, res) => {
    const username = req.session.user.username
    if (username == null)
    {
        res.status(400).send("You are currently not logged in")
    }
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
        console.log(items)
        res.send(items);
    })
    .catch(err => {
        console.error(`Failed to find documents: ${err}`)
    })
}