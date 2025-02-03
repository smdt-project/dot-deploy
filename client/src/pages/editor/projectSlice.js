import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	project: {
		name: "",
		code: { html: "", css: "", js: "" },
		type: "ui",
		lngName: "html",
	},
	currLng: "html",
	currCode: "",
	isLoading: false,
	error: false,
	isNew: true,
};

const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setCurrProject: (state, action) => {
			state.isNew = action.payload.isNew;
			state.project = action.payload.project;
		},
		updateSnippetCode: (state, action) => {
			state.project = {
				...state.project,
				code: { code: action.payload },
			};
		},
		updateHTML: (state, action) => {
			state.project = {
				...state.project,
				code: { ...state.project.code, html: action.payload },
			};
		},
		updateCSS: (state, action) => {
			state.project = {
				...state.project,
				code: { ...state.project.code, css: action.payload },
			};
		},
		updateJS: (state, action) => {
			state.project = {
				...state.project,
				code: { ...state.project.code, js: action.payload },
			};
		},
		updateSelectedLng: (state, action) => {
			state.currCode = action.payload.code;
			state.currLng = action.payload.lng;
		},
		resetCurrProject: (state) => {
			state.currCode = initialState.currCode;
			state.currLng = initialState.currLng;
			state.project = initialState.project;
			state.isNew = initialState.isNew;
			state.error = initialState.error;
			state.isLoading = initialState.isLoading;
		},
		updateProjectRequest: (state) => {
			state.isDone = false;
			state.error = "";
			state.isLoading = true;
		},
		updateProjectSuccess: (state) => {
			state.isLoading = false;
			state.isDone = true;
		},
		updateProjectFailure: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const {
	setCurrProject,
	updateSnippetCode,
	updateCSS,
	updateHTML,
	updateJS,
	updateSelectedLng,
	resetCurrProject,
	updateProjectRequest,
	updateProjectSuccess,
	updateProjectFailure,
} = projectSlice.actions;

export default projectSlice.reducer;
