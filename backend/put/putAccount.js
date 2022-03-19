const { response } = require("express");
const connect = require("../database.js");

exports.putUser = (req, res) => {
    console.log("Registering an account");
    const dbConnect = connect.getDb();
    dbConnect.collection("users").updateOne(
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