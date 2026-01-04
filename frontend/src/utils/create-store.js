import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../slices/blogSlice";
import adminReducer from "../slices/adminSlice";
import commentReducer from "../slices/commentSlice";

const store = configureStore({
    reducer: {
        blog: blogReducer,
        admin: adminReducer,
        comment: commentReducer,
    },
});

export default store;
