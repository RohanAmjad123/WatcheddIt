const connect = require("../database.js");

exports.postComment = (req, res) => {
    if(req.session.user || req.session.admin){
        const dbConnect = connect.getDb();

        dbConnect
        .collection("CommentEvents")
        .insertOne(req.body);

        res.sendStatus(200);
    }
    else{
        res.status(400).send("Can't POST comment, not logged in");
    }
}