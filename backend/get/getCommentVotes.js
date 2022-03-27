const {ObjectId} = require('mongodb');
const connect = require('../database');

exports.getCommentVotes = (req, res) => {
    console.log(`getCommentVotes ${req.params.commentID}`);
    const dbConnect = connect.getDb();
    dbConnect.collection('CommentVotes')
        .aggregate([{
            $match: {
                commentID: ObjectId(req.params.commentID),
            },
        }, {
            $group: {
                _id: '$commentID',
                upVote: {
                    $sum: {
                        $cond: [
                            '$vote', 1, 0,
                        ],
                    },
                },
                downVote: {
                    $sum: {
                        $cond: [
                            '$vote', 0, 1,
                        ],
                    },
                },
            },
        }, {
            $project: {
                _id: 0,
            },
        }])
        .toArray((err, result) => {
            if (err) {
                res.status(400).send(`Error getting comment vote ${req.params.commentID}`);
            } else {
                res.status(200).json(result[0]);
            }
        })
};

exports.getUserCommentVote = (req, res) => {
    if (req.session.user) {
        console.log(`getUserCommentVotes ${req.params.commentID}`);
        const dbConnect = connect.getDb();
        dbConnect.collection('CommentVotes')
            .findOne({
                    commentID: ObjectId(req.params.commentID),
                    username: req.session.user.username
                }, {
                    projection: {_id: 0, vote: 1}
                }, (err, result) => {
                    if (err) {
                        res.status(400).send(`Error getting comment vote ${req.params.commentID}`);
                    } else {
                        res.status(200).send(result);
                    }
                },
            );
    } else {
        res.status(401).send("Can't GET comment vote, not logged in");
    }
};
