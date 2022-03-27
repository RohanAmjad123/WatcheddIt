const connect = require('../database');
const {ObjectId} = require("mongodb");

exports.putCommentVote = (req, res) => {
    if (req.session.user) {
        if (typeof req.body.vote !== "boolean") {
            res.status(400).send('Error - Invalid Vote Value');
            return;
        }
        console.log(`putCommentVotes ${req.params.commentID}`);
        const dbConnect = connect.getDb();
        dbConnect.collection('CommentVotes')
            .updateOne({
                commentID: ObjectId(req.params.commentID),
                username: req.session.user.username,
            }, {
                $set: {vote: req.body.vote},
            }, (err, result) => {
                if (err) {
                    res.status(400).send(`Error putting comment vote ${req.params.commentID}`);
                } else {
                    res.status(200).json(result);
                }
            });
    } else {
        res.status(401).send("Can't PUT comment vote, not logged in");
    }
};
