const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypts = require("bcryptjs");
const {
    registerValidation,
    loginValidation,
} = require("../validations/user-validation");

const usersController = {};

usersController.register = async (req, res) => {
    const body = req.body;
    const { error, value } = registerValidation.validate(body, {
        abortEarly: false,
    });
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    try {
        const userByEmail = await User.findOne({ email: value.email });
        if (userByEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }
        const user = new User(value);
        const salt = await bcrypts.genSalt();
        const hash = await bcrypts.hash(value.password, salt);
        user.password = hash;
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something Went wrong!" });
    }
};

usersController.login = async (req, res) => {
    const body = req.body;
    const { error, value } = loginValidation.validate(body, {
        abortEarly: false,
    });
    try {
        const user = await User.findOne({ email: value.email });
        if (!user) {
            return res.status(401).json({ error: "invalid email/password" });
        }
        const passwordMatch = await bcrypts.compare(
            value.password,
            user.password
        );
        if (!passwordMatch) {
            return res.status(401).json({ error: "invalid email/password" });
        }
        const tokenData = { userId: user._id, role: user.role };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(201).json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

usersController.profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

usersController.listUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" });
        if (!users) {
            return res.status(404).json({ error: "no users found!" });
        }
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

usersController.viewUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "user not found!" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong!" });
    }
};

module.exports = usersController;
