const Blog = require("../models/blog-model");
const Comment = require("../models/comment-model.");
const blogValidation = require("../validations/blog-validation");

const blogsController = {};

blogsController.list = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("userId");
        if (!blogs) {
            return res.status(404).json({ error: "no blogs found!" });
        }
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

blogsController.showMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.userId });
        if (!blogs) {
            return res.status(404).json({ error: "no blogs found!" });
        }
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

blogsController.readBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findById(id).populate("userId");
        if (!blog) {
            return res.status(404).json({ error: "blog not found!" });
        }
        res.status(200).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

blogsController.create = async (req, res) => {
    const body = req.body;
    const { error, value } = blogValidation.validate(body, {
        abortEarly: false,
    });
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    try {
        const blog = new Blog({ ...value, userId: req.userId });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

blogsController.update = async (req, res) => {
    const blogId = req.params.id;
    const body = req.body;
    const { error, value } = blogValidation.validate(body, {
        abortEarly: false,
    });
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    try {
        let blog;
        if (req.role == "user") {
            blog = await Blog.findOneAndUpdate(
                { _id: blogId, userId: req.userId },
                { $set: value },
                { new: true, runValidators: true }
            );
        } else if (req.role == "admin") {
            blog = await Blog.findOneAndUpdate(
                { _id: blogId },
                { $set: value },
                { new: true, runValidators: true }
            );
        }
        if (!blog) {
            return res.status(404).json({ error: "no blogs found!" });
        }
        res.status(201).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

blogsController.delete = async (req, res) => {
    const blogId = req.params.id;
    try {
        let blog;
        if (req.role == "user") {
            blog = await Blog.findOneAndDelete({
                _id: blogId,
                userId: req.userId,
            });
        } else if (req.role == "admin") {
            blog = await Blog.findOneAndDelete({
                _id: blogId,
            });
        }
        if (!blog) {
            return res.status(404).json({ error: "no blogs found!" });
        }
        const comments = await Comment.deleteMany({ postId: blogId });
        res.status(201).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

blogsController.usersBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const blogs = await Blog.find({ userId: id }).populate("userId");
        if (!blogs) {
            return res.status(404).json({ error: "no blogs found!" });
        }
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

module.exports = blogsController;
