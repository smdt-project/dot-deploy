import { createSlice } from "@reduxjs/toolkit";
import { storeUserData } from "../authData";

const initialState = {
	isLoading: false,
	error: null,
	isUserLoggedIn: false,
};

const signInSlice = createSlice({
	name: "signIn",
	initialState: initialState,
	reducers: {
		signInRequest: (state) => {
			state.isUserLoggedIn = false;
			state.isLoading = true;
			state.error = "";
		},
		signInSuccess: (state, action) => {
			storeUserData(action.payload);
			state.isLoading = false;
			state.isUserLoggedIn = true;
		},
		signInFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { signInRequest, signInSuccess, signInFailure } =
	signInSlice.actions;

export default signInSlice.reducer;
