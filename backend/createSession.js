const connect = require("./database.js");

exports.createSession  = (req, res) => {
    const dbConnect = connect.getDb();

    dbConnect
    .collection("user")
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
}

