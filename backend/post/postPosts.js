const { ObjectId } = require("mongodb");
const connect = require("../database.js");

exports.postPost = (req, res) => {
    if(req.session.user){
        const dbConnect = connect.getDb();

        let postEvent = {
            "type": "post",
            "postID": ObjectId(),
            "data": req.body,
            "user": null,
            "timestamp": new Date()
        };
        
        dbConnect
        .collection("PostEvents")
        .insertOne(postEvent);
      
        res.sendStatus(200);
    }
    else{
        res.status(400).send("Can't POST post, not logged in");
    }
}