import { createSlice } from "@reduxjs/toolkit";
import { removeUserData } from "./authData";

const initialState = {
	isUserSignedIn: false,
	user: null,
	userData: null,
	isLoading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authStatus: (state, action) => {
			state.isUserSignedIn = action.payload.isUserSignedIn;
			state.user = action.payload.userData;
		},
		logOutRequest: (state) => {
			state.error = "";
		},
		logOutSuccess: () => {
			removeUserData();
		},
		logOutFailure: (state, action) => {
			state.error = action.payload;
		},
		userDataRequest: (state) => {
			state.isLoading = true;
			state.error = "";
		},
		userDataSuccess: (state, action) => {
			state.isLoading = false;
			state.userData = action.payload;
		},
		userDataFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	authStatus,
	logOutFailure,
	logOutSuccess,
	logOutRequest,
	userDataRequest,
	userDataFailure,
	userDataSuccess,
} = authSlice.actions;

export default authSlice.reducer;
