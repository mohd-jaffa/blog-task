import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, setUsersName } from "../slices/adminSlice";
import { Link } from "react-router-dom";

export default function UsersList() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(listUsers());
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

    return (
        <div>
            <h1 className="text-3xl mb-5">Users List</h1>
            <ul className="grid gap-3">
                {data.map((ele) => {
                    return (
                        <li key={ele._id}>
                            <div className="flex gap-3">
                                <p className="text-gray-800 font-medium">
                                    {ele?.name}
                                </p>
                                <Link to={`/users/${ele._id}`}>
                                    <button className="bg-blue-200 rounded-lg px-3 py-1 hover:bg-yellow-500 mt-[-5px] font-bold">
                                        show info
                                    </button>
                                </Link>
                                <Link to={`/users/${ele._id}/blogs`}>
                                    <button
                                        onClick={() =>
                                            dispatch(setUsersName(ele.name))
                                        }
                                        className="bg-blue-200 rounded-lg px-3 py-1 hover:bg-yellow-500 mt-[-5px] font-bold"
                                    >
                                        show blogs
                                    </button>
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
