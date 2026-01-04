import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const listUsers = createAsyncThunk(
    "admin/listUsers",
    async (undefined, { rejectWithValue }) => {
        try {
            const response = await axios.get("/users", {
                headers: { Authorization: localStorage.getItem("token") },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const usersInfo = createAsyncThunk(
    "admin/usersInfo",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/users/${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const usersBlogs = createAsyncThunk(
    "admin/usersBlogs",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/users/blogs/${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        data: [],
        loading: false,
        error: null,
        user: null,
        usersName: "",
    },
    reducers: {
        setUsersName: (state, action) => {
            state.usersName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(listUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(listUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(listUsers.rejected, (state) => {
                state.loading = true;
                state.error = action.payload;
                state.data = null;
            })
            .addCase(usersInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(usersInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(usersInfo.rejected, (state) => {
                state.loading = true;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(usersBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(usersBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(usersBlogs.rejected, (state) => {
                state.loading = true;
                state.error = action.payload;
                state.data = null;
            });
    },
});

export default adminSlice.reducer;
export const { setUsersName } = adminSlice.actions;
