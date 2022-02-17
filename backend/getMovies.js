const connect = require("./database.js");

let pageLimit = 10

exports.getMovies = (req, res) => {
    const dbConnect = connect.getDb()

    dbConnect
        .collection("media")
        .find()
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching movies!");
            } else {
                res.json(result);
            }
        });
}

exports.getMoviePage = (req, res) => {
    let pageNumber = parseInt(req.params.page) - 1

    const dbConnect = connect.getDb()

    dbConnect
        .collection("media")
        .find()
        .skip(pageNumber >= 0 ? (pageNumber) * pageLimit : 0)
        .limit(pageLimit)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching movies!");
            } else {
                res.json(result);
            }
        });
}

exports.getMovieCount = (req, res) => {
    const dbConnect = connect.getDb()

    dbConnect
        .collection("media")
        .find()
        .count(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching movie count!");
            } else {
                res.json(result);
            }
        })
}