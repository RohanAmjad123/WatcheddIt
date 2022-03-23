const connect = require("../database.js");

exports.postMedia = (req, res) => {
    if(req.session.admin){
        const dbConnect = connect.getDb();

        dbConnect
        .collection("Media")
        .insertOne(req.body);

        res.sendStatus(200);
    }
    else{
        res.status(401).send("Can't POST media, no admin privileges");
    }
}