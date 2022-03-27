const {ObjectId} = require('mongodb');
const connect = require('../database');

exports.postCommentVote = (req, res) => {
    if (req.session.user) {
        if (typeof req.body.vote !== "boolean") {
            res.status(400).send('Error - Invalid Vote Value');
            return;
        }
        console.log(`postCommentVotes ${req.params.commentID}`);
        const dbConnect = connect.getDb();
        dbConnect.collection('CommentVotes')
            .insertOne({
                commentID: ObjectId(req.params.commentID),
                username: req.session.user.username,
                vote: req.body.vote,
            }, (err, result) => {
                if (err) {
                    res.status(400).send(`Error posting comment vote ${req.params.commentID}`);
                } else {
                    res.status(200).json(result);
                }
            })
    } else {
        res.status(401).send("Can't POST comment vote, not logged in");
    }
};
