import { useContext } from "react";
import UserContext from "../context/UserContext";
import Home from "../pages/Home";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
    const { user, isLoggedIn } = useContext(UserContext);

    const id = localStorage.getItem("token");
    if (id && !isLoggedIn) {
        return <p>Loading...</p>;
    } else if (id && allowedRoles.includes(user.role)) {
        return children;
    } else if (id && !allowedRoles.includes(user.role)) {
        return <Home />;
    } else {
        return <Navigate to="/login" replace />;
    }
}
