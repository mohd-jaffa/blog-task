const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        title: String,
        content: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
