const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getMediaPosts = (req, res) => {

    const dbConnect = connect.getDb();
    const imdbID = req.params.imdbID;
    console.log("Get media posts : " + imdbID);
    dbConnect.collection("Posts")
        .find({"imdbID": imdbID})
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

exports.getAllPosts = (req, res) => {
    const dbConnect = connect.getDb();
    console.log("Get all posts");
    dbConnect.collection("Posts")
        .find()
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching posts!");
            } else {
                res.json(result);
            }
        });
}

exports.getPost = (req, res) => {
    const dbConnect = connect.getDb();
    const imdbID = req.params.imdbID;
    dbConnect.collection("Posts")
        .find({"imdbID": imdbID, "_id": ObjectId(req.params.postID)})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching posts!");
            } else {
                res.json(result);
            }
        });
    // console.log(req.params.Title);
}
