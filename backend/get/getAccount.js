const connect = require("../database.js");

exports.login = (req, res) => {
    const dbConnect = connect.getDb();
    dbConnect.collection("users").findOne(
        {
            username: req.body.username,
            password: req.body.password
        }, function(err, result) {
            if (err) throw err;
            console.log(result)
            if (result == null) {
                console.log("User not found")
                res.status(401);
            } else if (result.type === "admin") {
                console.log("user is admin")
                req.session.admin = result;
                res.send(result)
            } else {
                console.log("User is regular user")
                req.session.user = result;
                res.send(result)
            }
        }
    )
}
