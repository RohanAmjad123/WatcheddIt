const connect = require("../database.js");
const ISODate = require('mongodb').ISODate;

exports.postPost = (req, res) => {
    if(req.session.user){
        const dbConnect = connect.getDb();

        dbConnect
        .collection("postEvents")
        .insertOne(json({
            "type":  "update",
            "data": req.body,
            'user': req.session.user.username,
            'timestamp': new Date().toISOString()
        }));

        res.sendStatus(200);
    }
    else{
        res.status(400).send("Can't POST post, not logged in");
    }
}