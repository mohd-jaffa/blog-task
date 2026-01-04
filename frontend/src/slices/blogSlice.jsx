import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const newBlog = createAsyncThunk(
    "blogs/newBlog",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/blogs", formData, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            window.alert("blog published successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const myBlogs = createAsyncThunk(
    "blogs/myBlogs",
    async (undefined, { rejectWithValue }) => {
        try {
            const response = await axios.get("/users/blogs", {
                headers: { Authorization: localStorage.getItem("token") },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const showBlogs = createAsyncThunk(
    "blogs/showBlogs",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/blogs/${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const editBlog = createAsyncThunk(
    "blogs/editBlog",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/blogs/${id}`, data, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            window.alert("blog edited successfully");

            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const allBlogs = createAsyncThunk(
    "blogs/allBlogs",
    async (undefined, { rejectWithValue }) => {
        try {
            const response = await axios.get("/blogs");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/blogs/${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            window.alert("blog deleted");
            return id;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        data: [],
        blog: null,
        loading: false,
        error: null,
        editId: null,
    },
    reducers: {
        setEditId: (state, action) => {
            state.editId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(newBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(newBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blog = action.payload;
            })
            .addCase(newBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.blog = null;
            })
            .addCase(myBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(myBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(myBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = null;
            })
            .addCase(showBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(showBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blog = action.payload;
            })
            .addCase(showBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.blog = null;
            })
            .addCase(editBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(editBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blog = action.payload;
            })
            .addCase(editBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.blog = null;
            })
            .addCase(allBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(allBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(allBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = null;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = state.data.filter(
                    (ele) => ele._id != action.payload
                );
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.blog = null;
            });
    },
});

export default blogSlice.reducer;
export const { setEditId } = blogSlice.actions;
