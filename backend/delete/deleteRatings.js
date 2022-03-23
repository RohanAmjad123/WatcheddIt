const connect = require("../database.js");
const {ObjectId, Double} = require("mongodb");

exports.deleteRating = (req, res) => {
    if (req.session.user) {
        const dbConnect = connect.getDb();
        // dbConnect.collection("Ratings")
        //     .deleteOne({
        //         imdbID: req.params.imdbID,
        //         userID: ObjectId(req.session.user._id)
        //     }, function (err, result) {
        //         if (err) {
        //             res.status(400).send(`Error deleting listing with id ${req.params.imdbID}!`);
        //         } else {
        //             console.log("1 document deleted");
        //             res.sendStatus(200);
        //         }
        //     });

        dbConnect.collection("Ratings")
            .findOneAndDelete({
                imdbID: req.params.imdbID,
                username: req.session.user.username
            }, function (err, result) {
                if (err) {
                    res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
                } else {
                    console.log("1 document updated");
                    console.log(result)
                    if (result.value === null) {
                        return
                    }
                    dbConnect.collection("Media")
                        .findOne({
                            imdbID: req.params.imdbID
                        }, {projection: {_id: 0, Ratings: 1}}, (err, media) => {
                            if (err) {
                                res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
                            } else {
                                console.log("1 document updated");
                                console.log(result)
                                dbConnect.collection("Media")
                                    .updateOne({
                                        imdbID: req.params.imdbID
                                    }, {
                                        $set: {
                                            'Ratings.avg': Double((media.Ratings.avg * media.Ratings.count - result.value.rating) / (media.Ratings.count - 1)),
                                            'Ratings.count': media.Ratings.count - 1
                                        },
                                    }, (err, result) => {
                                        if (err) {
                                            res.status(400).send(`Error updating Media with id ${req.params.imdbID}!`);
                                        } else {
                                            console.log("1 document updated");
                                            res.sendStatus(200);
                                        }
                                    });
                            }
                        })
                }
            })

    } else {
        res.status(400).send("Can't DELETE post, not logged in");
    }
}