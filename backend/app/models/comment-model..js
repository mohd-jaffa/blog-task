const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        comment: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
