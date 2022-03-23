const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.postPostVote = (req, res) => {
    if (req.session.user) {
        const dbConnect = connect.getDb();
        console.log("Add Post Vote")
        dbConnect.collection("PostVotes")
            .updateOne({
                postID: ObjectId(req.params.postID),
                userID: ObjectId(req.session.user._id),
            }, {
                $set: {vote: req.body.vote},
            }, {upsert: true})
            .then((obj) => {
                console.log('Updated: ' + obj);
                res.sendStatus(200);
            })
            .catch((err) => {
                console.log('Error: ' + err);
                res.status(400);
            })
    } else {
        res.status(401).send("Can't POST ratings, not logged in");
    }
}