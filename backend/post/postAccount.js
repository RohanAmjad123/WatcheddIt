const { response } = require("express");
const connect = require("../database.js");
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = (req, res) => {
    console.log("Registering an account");
    const dbConnect = connect.getDb();
    bcrypt.hash(req.body.password, saltRounds, function (err1, hash) {
        dbConnect.collection("users").insertOne(
            {
                username: req.body.username,
                password: hash,
                type: "user",
                date: Date.now
            }, function(err, response) {
                if (err) {
                    console.log("Failed to register an account")
                    res.status(400).send("Failure trying to register an account")
                } else {
                    res.send(response)
                }
            }
        )
        if (err1) throw err1;    
    })
}