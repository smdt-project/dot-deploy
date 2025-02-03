import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	error: null,
	projects: [],
	users: [],
	posts: [],
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		searchRequest: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		searchSuccess: (state, action) => {
			state.projects = action.payload.projects;
			state.posts = action.payload.posts;
			state.users = action.payload.users;
			state.isLoading = false;
		},
		searchFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { searchRequest, searchSuccess, searchFailure } =
	searchSlice.actions;

export default searchSlice.reducer;
