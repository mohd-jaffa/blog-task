import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usersInfo } from "../slices/adminSlice";

export default function UsersInfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(usersInfo(id));
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
        <div className="flex justify-center">
            <div className="max-w-md bg-white rounded-xl shadow-sm p-6 w-full bg-white">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    User info of {user?.name}
                </h2>
                <div className="space-y-4 text-sm">
                    <div>
                        <p className="text-gray-500">Name</p>
                        <p className="text-gray-800 font-medium">
                            {user?.name}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Email</p>
                        <p className="text-gray-800 font-medium">
                            {user?.email}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Role</p>
                        <p className="text-gray-800 font-medium">
                            {user?.role}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Joined on</p>
                        <p className="text-gray-800 font-medium">
                            {user?.createdAt?.slice(0, 10)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
