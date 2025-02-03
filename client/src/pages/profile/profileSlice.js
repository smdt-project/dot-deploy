import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currTab: "projects",
	isLoading: false,
	error: null,
	userData: null,
	profileChanged: false,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setChangeStatus: (state, action) => {
			state.profileChanged = action.payload;
		},
		changeCurrTab: (state, action) => {
			state.currTab = action.payload;
		},
		userProfileRequest: (state) => {
			state.currTab = "projects";
			state.isLoading = true;
			state.error = null;
		},
		userProfileSuccess: (state, action) => {
			state.profileChanged = false;
			state.userData = action.payload;
			state.isLoading = false;
		},
		userProfileFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		deleteItemRequest: (state) => {
			state.profileChanged = false;
		},
		deleteItemSuccess: (state) => {
			state.profileChanged = true;
		},
	},
});

export const {
	setChangeStatus,
	deleteItemSuccess,
	changeCurrTab,
	userProfileRequest,
	userProfileSuccess,
	userProfileFailure,
	deleteItemRequest,
} = profileSlice.actions;

export default profileSlice.reducer;
