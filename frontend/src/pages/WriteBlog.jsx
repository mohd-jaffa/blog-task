import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editBlog, newBlog, setEditId, showBlogs } from "../slices/blogSlice";
import { useEffect } from "react";

export default function WriteBlog() {
    const dispatch = useDispatch();
    const { editId } = useSelector((state) => state.blog);

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
        },
        onSubmit: async (values, { resetForm }) => {
            if (editId) {
                await dispatch(editBlog({ id: editId, data: values })).unwrap();
                dispatch(setEditId(null));
            } else {
                dispatch(newBlog(values));
            }
            resetForm();
        },
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await dispatch(showBlogs(editId)).unwrap();
                formik.setValues({
                    title: result.title,
                    content: result.content,
                });
            } catch (err) {
                console.error(err);
                window.alert(err.message);
            }
        };
        if (editId) {
            fetchDetails();
        }
    }, [editId, dispatch]);

    return (
        <div className="grid justify-center gap-3">
            <h1>Write a new Blog</h1>
            <form onSubmit={formik.handleSubmit} className="grid w-xl gap-3">
                <input
                    type="text"
                    id="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    minLength={10}
                    maxLength={70}
                    placeholder="give a title to your blog"
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400"
                />
                <textarea
                    id="content"
                    rows={15}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                    minLength={300}
                    maxLength={10000}
                    placeholder="start writing here..."
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm placeholder-gray-400"
                ></textarea>
                <input
                    type="submit"
                    value="publish"
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 peer-invalid/title:bg-gray-300 peer-invalid/desc:bg-gray-300 peer-invalid/title:cursor-not-allowed peer-invalid/desc:cursor-not-allowed"
                />
            </form>
        </div>
    );
}
