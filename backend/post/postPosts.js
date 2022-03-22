const {ObjectId} = require("mongodb");
const connect = require("../database.js");

exports.postPost = (req, res) => {
    if (req.session.user || true) {
        const dbConnect = connect.getDb();
        console.log(req.body)
        let postEvent = {
            "type": "post",
            "postID": ObjectId(),
            "data": req.body,
            "user": null,
            "timestamp": new Date()
        };

        dbConnect
            .collection("PostEvents")
            .insertOne({
                type: "post",
                postID: ObjectId(),
                data: req.body,
                // 'user': req.session.user.username,
                user: null,
                timestamp: new Date()
            });

        res.sendStatus(200);
    } else {
        res.status(400).send("Can't POST post, not logged in");
    }
}