import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../slices/blogSlice";
import { Link } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(allBlogs());
    }, [dispatch]);

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

    if (data?.length == 0) {
        return (
            <div className="flex items-center justify-center mt-20 text-lg text-red-400 font-bold">
                <p>nothing here now</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl">All Blogs</h1>
            <div className="grid gap-5 mt-5">
                {data?.map((ele) => {
                    return (
                        <div
                            className="max-w-md bg-white rounded-xl shadow-sm p-6 w-full bg-white"
                            key={ele._id}
                        >
                            <p className="text-gray-800 font-medium">
                                {ele.title}
                            </p>
                            <p className="text-gray-400 font-medium">
                                by {ele.userId.name} - posted on{" "}
                                {ele.createdAt.slice(0, 10)}
                            </p>
                            <div className="mt-5 flex gap-3">
                                <Link to={`/blogs/${ele._id}`}>
                                    <button className="bg-blue-200 rounded-lg px-3 py-1 hover:bg-yellow-500 mt-[-5px] font-bold">
                                        Read full
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
