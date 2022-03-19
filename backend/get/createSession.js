const connect = require("../database.js");
exports.createSession  = (req, res) => {
    console.log("Attempting login");
    const dbConnect = connect.getDb();

    dbConnect
    .collection("users").findOne(
        {
            username: req.body.username,
            password: req.body.password
        }, function(err, result) {
            if (err) throw err;
            console.log(result.username)
            db.close()
        }
    )
    res.send(200)
}
/*
    if (res == null) {
        console.log("User not found")
    } else {
        if (res.body.type == "admin") {
            console.log("User is admin")
            req.session.admin = res
        } else {
            console.log("User is user")
            req.session.user = res
        }
        
        res.json(result)
        res.redirect('/')
    }
*/
//     .find({"postId": ObjectId(req.params.postId)}, {projection: {_id: 0}})
//     .limit(limit)
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send("Error fetching comments!");
//       } else {
//         res.json(result);
//       }
//     });
    
//     // console.log(req.params.media);
//     console.log(limit);
//     // res.send(req.params.media + req.params.post);


