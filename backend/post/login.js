const connect = require("../database.js");
var bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const dbConnect = connect.getDb();
    console.log("Logging into an account...")
    dbConnect.collection("users").findOne(
        {
            username: req.body.username,
        }, function(err, result) 
        {
            if (err) throw err;
            console.log(result)
            if (result == null) {
                console.log("No matching email-address")
                res.status(401).send("No matching username found")
                return
            }
            bcrypt.compare(req.body.password, result.password, function (err1, res2) 
            {
                if (err1) {
                    console.log("An error has occured while trying to login")
                    res.status(400).send("An error has occured while trying to login")
                    throw err1;
                }
                if (res2 === false) {
                    console.log("Wrong password!")
                    res.status(401).send("Wrong password")
                    return;
                }
                // A valid password hash match has been found
                if (result.type === "admin") {
                    console.log("user is admin")
                    req.session.admin = result;
                    res.json(req.session)
                } else {
                    console.log("user is regular user")
                    req.session.user = result
                    res.json(req.session)
                }
            })
        }
    )
}
