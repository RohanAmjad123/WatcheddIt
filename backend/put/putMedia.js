const { response } = require("express");
const connect = require("../database.js");

exports.putMedia = (req, res) => {
    console.log("updatting media");
    const dbConnect = connect.getDb();
    dbConnect.collection("media").updateOne(req.body);
}
