const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getAllPosts = (req, res) => {

    const dbConnect = connect.getDb();
    const imdbID = req.params.imdbID;
    console.log("Get all posts : " + imdbID);
    dbConnect
    .collection("posts")
    .find({"imdbID": imdbID}, {projection: { imdbID: 0}})
    .limit(100)
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

  const dbConnect = connect.getDb();
  const imdbID = req.params.imdbID;
  console.log("posts");
  dbConnect
  .collection("posts")
  .find({"imdbID": imdbID, "postID": ObjectId(req.params.postID)})
  .toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching posts!");
   } else {
      res.json(result);
    }
  });
  // console.log(req.params.Title);
}
