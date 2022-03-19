const connect = require("../database.js");

exports.getAccount = (req, res) => {
    const dbConnect = connect.getDb();
    console.log("Hello aaaaah")
    res.send(200)
}