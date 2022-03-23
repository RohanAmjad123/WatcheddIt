const connect = require("../database.js");
const {ObjectId} = require("mongodb");

exports.deleteRatings = (req, res) => {
    if (req.session.user) {
        const dbConnect = connect.getDb();
        dbConnect.collection("Ratings")
            .deleteOne({
                imdbID: req.params.imdbID,
                userID: ObjectId(req.session.user._id)
            }, function (err, result) {
                if (err) {
                    res.status(400).send(`Error deleting listing with id ${req.params.imdbID}!`);
                } else {
                    console.log("1 document deleted");
                    res.sendStatus(200);
                }
            });
    } else {
        res.status(400).send("Can't DELETE post, not logged in");
    }
}