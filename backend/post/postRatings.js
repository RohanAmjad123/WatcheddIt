const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.postRating = (req, res) => {
    if (req.session.user) {
        const dbConnect = connect.getDb();
        // req.body.userID = ObjectId(req.session.user._id)
        console.log("Add Ratings")
        dbConnect
            .collection("Ratings")
            .updateOne({
                imdbID: req.params.imdbID,
                userID: ObjectId(req.session.user._id),
            }, {
                $set:{rating: req.body.rating},
            }, {upsert: true});

        res.sendStatus(200);
    } else {
        res.status(400).send("Can't POST ratings, not logged in");
    }
}