const connect = require("../database.js");

exports.postPost = (req, res) => {
    //if(req.session.user){
        const dbConnect = connect.getReadDb();

        dbConnect
        .collection("posts")
        .insertOne(req.body);
        res.sendStatus(200);
    //}
    //else{
        //res.status(400).send("Can't POST post, not logged in");
    //}
}