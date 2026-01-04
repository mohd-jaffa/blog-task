import { useEffect, useReducer } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        }
        case "LOGOUT": {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default function AuthProvider(props) {
    const navigate = useNavigate();

    const [userState, userDispatch] = useReducer(userReducer, {
        user: null,
        isLoggedIn: false,
    });

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const fetchUser = async (req, res) => {
                try {
                    const response = await axios.get("/users/profile", {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    });
                    userDispatch({ type: "LOGIN", payload: response.data });
                } catch (err) {
                    console.log(err.response.data.error);
                    window.alert(err.response.data.error);
                }
            };
            fetchUser();
        }
    }, []);

    const handleRegister = async (formData, resetForm) => {
        try {
            const response = await axios.post("/register", formData);
            console.table(response.data);
            window.alert("registered successfully");
            navigate("/login");
            resetForm();
        } catch (err) {
            console.log(err.response.data.error);
            window.alert(err.response.data.error);
        }
    };

    const handleLogin = async (formData, resetForm) => {
        try {
            const response = await axios.post("/login", formData);
            localStorage.setItem("token", response.data.token);
            const userInfo = await axios.get("/users/profile", {
                headers: { Authorization: localStorage.getItem("token") },
            });
            userDispatch({ type: "LOGIN", payload: userInfo.data });
            console.table(userInfo.data);
            window.alert("successfully logged in");
            navigate("/");
            resetForm();
        } catch (err) {
            console.log(err);
            console.log(err.response.data.error);
            window.alert(err.response.data.error);
        }
    };

    const handleLogout = () => {
        const isConfirm = window.confirm("are you sure?");
        if (isConfirm) {
            localStorage.removeItem("token");
            userDispatch({ type: "LOGOUT" });
            window.alert("Logout success!");
        }
    };

    return (
        <UserContext.Provider
            value={{
                ...userState,
                userDispatch,
                handleRegister,
                handleLogin,
                handleLogout,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
