const connect = require("./database.js");

exports.getPosts = (req, res) => {

    const dbConnect = connect.getDb();
    const Title = req.params.Title;
    console.log("posts");
    dbConnect
    .collection("media")
    .find({Title: Title}, {projection: { Title: 0}}).limit(100)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching posts!");
     } else {
        res.json(result);
      }
    });
    console.log(req.params.Title);
}
