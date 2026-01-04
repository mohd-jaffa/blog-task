import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showBlogs } from "../slices/blogSlice";
import { useFormik } from "formik";
import {
    deleteComments,
    postComments,
    showComments,
} from "../slices/commentSlice";
import UserContext from "../context/UserContext";

export default function ShowBlogs() {
    const { user, isLoggedIn } = useContext(UserContext);
    const { id } = useParams();
    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        onSubmit: async (values, { resetForm }) => {
            dispatch(postComments({ id, formData: values }));
            resetForm();
        },
    });
    const dispatch = useDispatch();

    const { blog, loading, error } = useSelector((state) => state.blog);
    const {
        data: commentsData,
        loading: commentsLoading,
        error: commentsError,
    } = useSelector((state) => state.comment);

    useEffect(() => {
        dispatch(showBlogs(id));
        dispatch(showComments(id));
    }, [id, dispatch]);

    const handleDeleteComment = (commentId) => {
        const isConfirm = window.confirm("are you sure?");
        if (isConfirm) {
            dispatch(deleteComments(commentId));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center mt-20 text-lg text-red-400 font-bold">
                <p>loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center mt-20 text-lg text-red-400 font-bold">
                <p>{error}</p>
            </div>
        );
    }

    if (commentsLoading) {
        return (
            <div className="flex items-center justify-center mt-20 text-lg text-red-400 font-bold">
                <p>loading...</p>
            </div>
        );
    }

    if (commentsError) {
        return (
            <div className="flex items-center justify-center mt-20 text-lg text-red-400 font-bold">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="grid gap-5">
            <div>
                <h2 className="text-3xl font-bold">{blog?.title}</h2>
                <p className="text-gray-400 font-medium mb-5">
                    by {blog?.userId?.name} - posted on{" "}
                    {blog?.createdAt?.slice(0, 10)}
                </p>
                <p>{blog?.content}</p>
            </div>

            <div className="max-w-[500px]">
                <h1 className="text-2xl">Comments</h1>
                {commentsData?.length == 0 && (
                    <p className="mb-5 text-blue-500 font-semibold">
                        no comments until now!
                    </p>
                )}
                <ul className="mb-5">
                    {commentsData?.length > 0 &&
                        commentsData?.map((ele) => {
                            return (
                                <li className="mb-3" key={ele._id}>
                                    <p className="text-blue-500 font-semibold">
                                        {ele?.comment}
                                    </p>
                                    <p className="text-gray-500">
                                        {ele?.userId?.name} -{" "}
                                        {ele?.createdAt?.slice(0, 10)} -{" "}
                                        {ele?.createdAt?.slice(11, 19)}
                                    </p>
                                    {(user?._id == ele.userId._id ||
                                        user?.role == "admin") && (
                                        <button
                                            onClick={() =>
                                                handleDeleteComment(ele._id)
                                            }
                                            className="bg-red-100 rounded-lg px-1 py-1"
                                        >
                                            delete
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                </ul>
                {isLoggedIn ? (
                    <form onSubmit={formik.handleSubmit} className="grid gap-3">
                        <label>comment on this blog</label>
                        <input
                            type="text"
                            placeholder="enter your comment"
                            id="comment"
                            minLength={1}
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400"
                        />
                        <input
                            type="submit"
                            value="post"
                            disabled={!formik.values.comment.trim()}
                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 disabled:bg-gray-50"
                        />
                    </form>
                ) : (
                    <p className="font-bold text-green-700">
                        login to add comments
                    </p>
                )}
            </div>
        </div>
    );
}
