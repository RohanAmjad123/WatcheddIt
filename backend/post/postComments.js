const connect = require("../database.js");
const {ObjectId} = require("mongodb");

exports.postComment = (req, res) => {
    if (req.session.user || req.session.admin) {
        const dbConnect = connect.getDb();
        dbConnect
            .collection("CommentEvents")
            .insertOne({
                "type": "post",
                "data": {
                    text: req.body.text,
                    user: ObjectId(req.session.user._id),
                    postID: ObjectId(req.body.postID),
                },
                commentID: ObjectId(),
                'user': ObjectId(req.session.user._id),
                'timestamp': new Date()
            });

        res.sendStatus(200);
    } else {
        res.status(400).send("Can't POST comment, not logged in");
    }
}