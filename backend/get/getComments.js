const connect = require("../database.js");
var ObjectId = require('mongodb').ObjectId; 

exports.getComments  = (req, res) => {
    const dbConnect = connect.getReadDb();

    // sets the limit based on whether :limit is defined in the url
    let limit = (parseInt(req.params.limit)) ? parseInt(req.params.limit):0;

    dbConnect
    .collection("comments")
    .find({"postId": ObjectId(req.params.postId)}, {projection: {_id: 0}})
    .limit(limit)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching comments!");
      } else {
        res.json(result);
      }
    });
    
    // console.log(req.params.media);
    console.log(limit);
    // res.send(req.params.media + req.params.post);
}

