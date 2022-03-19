const { response } = require("express");
const connect = require("../database.js");

exports.postAccount = (req, res) => {
    console.log("Registering an account");
    const dbConnect = connect.getDb();
    dbConnect.collection("users").insertOne(
        {
            username: req.body.username,
            password: req.body.password,
            type: "user",
            date: Date.now
        }, function(err, response) {
            if (err) {
                res.send(response)
            } else {
                res.send(response)
            }
        }
    )
}