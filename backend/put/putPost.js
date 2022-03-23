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
            'timestamp': new Date()
        }));

        res.sendStatus(200);
    }
    else{
        res.status(401).send("Can't PUT post, not logged in");
    }
}