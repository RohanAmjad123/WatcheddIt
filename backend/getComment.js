const connect = require("./database.js");

exports.getComments  = (req, res) => {
    const dbConnect = connect.getDb();
    console.log("comments");
    dbConnect
    .collection("comments")
    .find({}).limit(100)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching comments!");
     } else {
        res.json(result);
      }
    });
    console.log(req.params.media);
    console.log(req.params.post);
    res.send(req.params.media + req.params.post);
}
