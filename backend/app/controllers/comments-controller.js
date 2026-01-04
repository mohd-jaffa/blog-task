const Comment = require("../models/comment-model.");
const commentValidation = require("../validations/comment-validation");

const commentsController = {};

commentsController.list = async (req, res) => {
    const id = req.params.id;
    try {
        const comments = await Comment.find({ postId: id }).populate("userId");
        if (!comments) {
            return res.status(404).json({ error: "no comments found!" });
        }
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

commentsController.create = async (req, res) => {
    const postId = req.params.id;
    const body = req.body;
    const { error, value } = commentValidation.validate(body, {
        abortEarly: false,
    });
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    try {
        const comment = new Comment({
            ...value,
            postId: postId,
            userId: req.userId,
        });
        await comment.save();
        const populatedComment = await comment.populate("userId");
        return res.status(201).json(populatedComment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

commentsController.delete = async (req, res) => {
    const id = req.params.id;
    try {
        let comment;
        if (req.role == "user") {
            comment = await Comment.findOneAndDelete({
                _id: id,
                userId: req.userId,
            });
        } else if (req.role == "admin") {
            comment = await Comment.findOneAndDelete({
                _id: id,
            });
        }
        if (!comment) {
            return res.status(404).json({ error: "comment not found!" });
        }
        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

module.exports = commentsController;
