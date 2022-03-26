const { response } = require("express");
const connect = require("../database.js");

exports.putUser = (req, res) => {
    console.log("updating media");
    const dbConnect = connect.getDb();
    dbConnect.collection("users").updateOne(req.body);
}