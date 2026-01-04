import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const showComments = createAsyncThunk(
    "comment/showComments",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/blogs/${id}/comments`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const postComments = createAsyncThunk(
    "comment/postComments",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `/blogs/${id}/comments`,
                formData,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            );
            window.alert("comment posted");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteComments = createAsyncThunk(
    "comment/deleteComments",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/comments/${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            return id;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(showComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(showComments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(showComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = null;
            })
            .addCase(postComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(postComments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = [...state.data, action.payload];
            })
            .addCase(postComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteComments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = state.data.filter(
                    (ele) => ele._id != action.payload
                );
            })
            .addCase(deleteComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default commentSlice.reducer;
