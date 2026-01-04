import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Navbar() {
    const { isLoggedIn, handleLogout, user } = useContext(UserContext);

    const linkClass = ({ isActive }) =>
        `text-sm transition ${
            isActive
                ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                : "text-gray-600 hover:text-gray-900"
        }`;

    return (
        <nav className="w-full border-b border-blue-200 bg-white mb-5">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">Blog</h1>
                <div className="flex gap-6">
                    <NavLink to="/" className={linkClass}>
                        Home
                    </NavLink>
                    {isLoggedIn && (
                        <>
                            <NavLink to="/profile" className={linkClass}>
                                Profile
                            </NavLink>
                            <NavLink to="/blogs" className={linkClass}>
                                My Blogs
                            </NavLink>
                            <NavLink to="/write" className={linkClass}>
                                write blog
                            </NavLink>
                            {user.role == "admin" && (
                                <>
                                    <NavLink to="/users" className={linkClass}>
                                        All Users
                                    </NavLink>
                                </>
                            )}
                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-800 mt-[-5px] font-bold"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <NavLink to="/login" className={linkClass}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={linkClass}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
