const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.postRating = (req, res) => {
    if (req.session.user || true) {
        const dbConnect = connect.getDb();
        req.body.userID = ObjectId(req.body.userID)
        dbConnect
            .collection("Ratings")
            .insertOne(req.body);

        res.sendStatus(200);
    } else {
        res.status(400).send("Can't POST ratings, not logged in");
    }
}