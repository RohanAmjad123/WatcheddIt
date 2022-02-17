const connect = require("./database.js");

exports.getPosts = (req, res) => {

    const dbConnect = connect.getDb();
    const title = req.params.title;
    console.log("posts");
    dbConnect
    .collection("media")
    .find({title: title}, {projection: {_id: 0, title: 0}}).limit(100)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching posts!");
     } else {
        res.json(result);
      }
    });
    console.log(req.params.title);
}
