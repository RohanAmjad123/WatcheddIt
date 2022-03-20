const { response } = require("express");
const connect = require("../database.js");

exports.putUser = (req, res) => {
    console.log("updatting media");
    const dbConnect = connect.getDb();
    dbConnect.collection("users").updateOne(req.body);
}