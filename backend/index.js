const express = require("express");
const configureDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
const cors = require("cors");
const usersController = require("./app/controllers/users-controller");
const authenticateUser = require("./app/middlewares/authenticateUser");
const blogsController = require("./app/controllers/blogs-controller");
const commentsController = require("./app/controllers/comments-controller");
const authorizeUser = require("./app/middlewares/authorizeUser");

app.use(express.json());
app.use(cors());
configureDB();

app.post("/api/register", usersController.register);
app.post("/api/login", usersController.login);
app.get("/api/users", authenticateUser, authorizeUser(["admin"]), usersController.listUsers);
app.get("/api/users/profile", authenticateUser, usersController.profile);
app.get("/api/users/blogs", authenticateUser, blogsController.showMyBlogs);
app.get("/api/users/blogs/:id", authenticateUser, authorizeUser(["admin"]), blogsController.usersBlog);
app.get("/api/users/:id", authenticateUser, authorizeUser(["admin"]), usersController.viewUser);

app.get("/api/blogs", blogsController.list);
app.post("/api/blogs", authenticateUser, blogsController.create);
app.get("/api/blogs/:id", blogsController.readBlog);
app.put("/api/blogs/:id", authenticateUser, blogsController.update);
app.delete("/api/blogs/:id", authenticateUser, blogsController.delete);

app.get("/api/blogs/:id/comments", commentsController.list);
app.post("/api/blogs/:id/comments", authenticateUser, commentsController.create);
app.delete("/api/comments/:id", authenticateUser, commentsController.delete);

app.listen(port, () => {
    console.log("server running on port", port);
});
