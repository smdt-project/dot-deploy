import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	error: null,
	isDone: false,
};

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		createPostRequest: (state) => {
			state.isDone = false;
			state.isLoading = true;
			state.error = "";
		},
		updatePostRequest: (state) => {
			state.isDone = false;
			state.isLoading = true;
			state.error = "";
		},
		deletePostRequest: (state) => {
			state.isDone = false;
			state.isLoading = true;
			state.error = "";
		},
		postSuccess: (state) => {
			state.isDone = true;
			state.isLoading = false;
		},
		postFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		resetPostStatus: (state) => {
			state.isLoading = false;
			state.error = null;
			state.isDone = false;
		},
	},
});

export const {
	postFailure,
	postSuccess,
	createPostRequest,
	updatePostRequest,
	deletePostRequest,
	resetPostStatus,
} = postSlice.actions;

export default postSlice.reducer;
