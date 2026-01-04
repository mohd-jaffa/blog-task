// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import WriteBlog from "./pages/WriteBlog";
import ShowBlogs from "./pages/ShowBlogs";
import UsersList from "./pages/UsersList";
import UsersInfo from "./pages/UsersInfo";
import UsersBlog from "./pages/UsersBlog";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <div className="m-5">
            <Navbar />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Register />} path="/register" />
                <Route element={<Login />} path="/login" />
                <Route
                    element={
                        <PrivateRoute allowedRoles={["user", "admin"]}>
                            <Profile />
                        </PrivateRoute>
                    }
                    path="/profile"
                />
                <Route
                    element={
                        <PrivateRoute allowedRoles={["user", "admin"]}>
                            <Blogs />
                        </PrivateRoute>
                    }
                    path="/blogs"
                />
                <Route
                    element={
                        <PrivateRoute allowedRoles={["user", "admin"]}>
                            <WriteBlog />
                        </PrivateRoute>
                    }
                    path="/write"
                />
                <Route element={<ShowBlogs />} path="/blogs/:id" />
                <Route
                    element={
                        <PrivateRoute allowedRoles={["admin"]}>
                            <UsersList />
                        </PrivateRoute>
                    }
                    path="/users"
                />
                <Route
                    element={
                        <PrivateRoute allowedRoles={["admin"]}>
                            <UsersInfo />
                        </PrivateRoute>
                    }
                    path="/users/:id"
                />
                <Route
                    element={
                        <PrivateRoute allowedRoles={["user", "admin"]}>
                            <UsersBlog />
                        </PrivateRoute>
                    }
                    path="/users/:id/blogs"
                />
            </Routes>
        </div>
    );
}

export default App;
