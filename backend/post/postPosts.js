const {ObjectId} = require("mongodb");
const connect = require("../database.js");

exports.postPost = (req, res) => {
    if (req.session.user) {
        const dbConnect = connect.getDb();
        console.log(req.body)

        dbConnect
<<<<<<< HEAD
        .collection("PostEvents")
        .insertOne({
            type:  "post",
            postID: ObjectId(),
            data: req.body,
            // 'user': req.session.user.username,
            user: req.session.user.username,
            timestamp: new Date()
        });
=======
            .collection("PostEvents")
            .insertOne({
                type: "post",
                postID: ObjectId(),
                data: req.body,
                user: req.session.user.username,
                timestamp: new Date()
            });
>>>>>>> ed1fe164150a9cf107f8c7897429cbea07aa09cb

        res.sendStatus(200);
    } else {
        res.status(401).send("Can't POST post, not logged in");
    }
}