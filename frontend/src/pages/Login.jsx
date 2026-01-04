import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { handleLogin, isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validate: (values) =>
            Object.assign(
                {},
                !values.email
                    ? { email: "Email is required" }
                    : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                      )
                    ? { email: "Invalid email address" }
                    : null,
                !values.password
                    ? { password: "Password is required" }
                    : values.password.length < 8
                    ? { password: "Password must be at least 8 characters" }
                    : null
            ),
        onSubmit: (values, { resetForm }) => {
            handleLogin(values, resetForm);
        },
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="grid justify-center p-10">
            <h1 className="text-4xl mb-5">Login Form</h1>
            <form className="grid gap-2" onSubmit={formik.handleSubmit}>
                <label>Email</label>
                <input
                    type="text"
                    placeholder="enter your email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400"
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="enter your password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400"
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}
                {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                )}
                <input
                    type="submit"
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200"
                />
            </form>
        </div>
    );
}
