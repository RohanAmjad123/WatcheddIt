const connect = require("../database.js");
const ObjectId = require('mongodb').ObjectId;

exports.getPostVotes = (req, res) => {
    console.log("getPostVotes " + req.params.postID)
    const dbConnect = connect.getDb();
    dbConnect.collection("PostVotes")
        .aggregate([{
            '$match': {
                'postID': ObjectId(req.params.postID)
            }
        }, {
            '$group': {
                '_id': '$postID',
                'upVote': {
                    '$sum': {
                        '$cond': [
                            '$vote', 1, 0
                        ]
                    }
                },
                'downVote': {
                    '$sum': {
                        '$cond': [
                            '$vote', 0, 1
                        ]
                    }
                }
            }
        }, {
            '$project': {
                '_id': 0
            }
        }])
        .toArray()
        .then(items => {
            res.json(items);
            res.sendStatus(200);
        })
        .catch(err => {
            console.error(`Failed to find documents: ${err}`)
            res.sendStatus(400);
        })
}

exports.getUserPostVotes = (req, res) => {
    if (req.session.user) {
        console.log('getUserPostVotes')
        const dbConnect = connect.getDb();
        const postID = req.params.postID;
        const userID = req.session.user._id;
        dbConnect.collection("PostVotes")
            .findOne({"postID": ObjectId(postID), "userID": ObjectId(userID)}, {projection: {_id: 0, vote: 1}})
            .then(items => {
                res.json(items);
                res.sendStatus(200);
            })
            .catch(err => {
                console.error(`Failed to find documents: ${err}`)
                res.sendStatus(400);
            })
    } else {
        res.status(401).send("Can't get ratings, no user privileges");
    }
}

