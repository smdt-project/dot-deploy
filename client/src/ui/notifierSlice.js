import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: null,
	error: null,
	success: null,
	warning: null,
	notification: null,
	normal: null,
};

const notifierSlice = createSlice({
	name: "notifier",
	initialState,
	reducers: {
		setNotifier: (state, action) => {
			state.loading = action.payload.loading;
			state.error = action.payload.error;
			state.success = action.payload.success;
			state.warning = action.payload.warning;
			state.notification = action.payload.notification;
			state.normal = action.payload.normal;
		},
		resetNotifier: (state) => {
			state.loading = initialState.loading;
			state.error = initialState.error;
			state.success = initialState.success;
			state.warning = initialState.warning;
			state.notification = initialState.notification;
			state.normal = initialState.normal;
		},
	},
});

export const { setNotifier, resetNotifier } = notifierSlice.actions;

export default notifierSlice.reducer;
