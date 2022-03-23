const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.postRating = (req, res) => {
    if (req.session.user) {
        console.log("Add Ratings")
        const dbConnect = connect.getDb();
        dbConnect.collection("Ratings")
            .updateOne({
                imdbID: req.params.imdbID,
                userID: ObjectId(req.session.user.username),
            }, {
                $set:{rating: req.body.rating},
            }, {upsert: true}, function(err, res) {
                if (err) {
                    res.status(400).send(`Error deleting listing with id ${req.params.imdbID}!`);
                } else {
                    console.log("1 document updated");
                    res.sendStatus(200);
                }
            });

    } else {
        res.status(401).send("Can't POST ratings, not logged in");
    }
}