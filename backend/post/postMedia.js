const connect = require("../database.js");

exports.postMedia = (req, res) => {
    if(req.session.admin){
        const dbConnect = connect.getWriteDb();

        dbConnect
        .collection("media")
        .insertOne(req.body);

        res.sendStatus(200);
    }
    else{
        res.send("Can't POST media, no admin privileges");
    }
}