const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getAllPosts = (req, res) => {

    const dbConnect = connect.getReadDb();
    const imdbID = req.params.imdbID;
    console.log("posts");
    dbConnect
    .collection("media")
    .find({"imdbID": ObjectId(imdbID)}, {projection: { imdbID: 0}}).limit(100)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching posts!");
     } else {
        res.json(result);
      }
    });
    // console.log(req.params.Title);
}

exports.getPost = (req, res) => {

  const dbConnect = connect.getReadDb();
  const imdbID = req.params.imdbID;
  console.log("posts");
  dbConnect
  .collection("media")
  .find({"imdbID": ObjectId(imdbID), "postID": ObjectId(req.params.postID)})
  .toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching posts!");
   } else {
      res.json(result);
    }
  });
  // console.log(req.params.Title);
}
