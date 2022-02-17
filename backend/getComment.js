
exports.getComments  = (req, res) => {
    console.log(req.params.media);
    console.log(req.params.post);
    res.send(req.params.media + req.params.post);
}
