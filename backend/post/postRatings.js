const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.postRating = (req, res) => {
    if (req.session.user) {
        console.log("Add Ratings")
        const dbConnect = connect.getDb();

        // adding rating to the Ratings collection
        dbConnect.collection("Ratings")
            .insertOne({
                imdbID: req.params.imdbID,
                userID: ObjectId(req.session.user.username),
                rating: req.body.rating
            });
            
        // updating the specific medias avg and total
        dbConnect.collection("Media")
            .updateOne({
                imdbID: req.params.imdbID
            },
            {
                $inc: {'Ratings.total': 1},
                $set: {'Ratings.avg': 0} // find a way to update the avg
            }, (err, res) => {
                if (err) {
                    res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
                } else {
                    console.log("1 document updated");
                    res.sendStatus(200);
                }
            });

    } else {
        res.status(401).send("Can't POST ratings, not logged in");
    }
}