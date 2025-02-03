import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSidebarOpened: false,
	goAnonymously: false,
	isLoading: false,
	error: null,
	latests: [],
	topProjects: [],
	notifications: [],
	detailedProject: null,
	detailedPost: null,
	isDetailing: false,
	detailingError: null,
	isLikingDone: false,
	commentingError: null,
	isCommenting: false,
	hasChange: false,
};

const communitySlice = createSlice({
	name: "community",
	initialState,
	reducers: {
		openSidebar: (state, action) => {
			state.isSidebarOpened = action.payload;
		},
		openAnonymously: (state, action) => {
			state.goAnonymously = action.payload;
		},
		changeMade: (state) => {
			state.hasChange = true;
		},
		getDataRequest: (state) => {
			state.isLoading = true;
			state.error = false;
		},
		getDataSuccess: (state, action) => {
			state.latests = action.payload.latests;
			state.topProjects = action.payload.topProjects;
			state.notifications = action.payload.notifications;
			state.isLoading = false;
			state.hasChange = false;
		},
		getDataFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		detailDataRequest: (state) => {
			state.isDetailing = true;
			state.detailingError = false;
		},
		projectDataSuccess: (state, action) => {
			state.detailedProject = action.payload;
			state.isDetailing = false;
			state.hasChange = false;
		},
		postDataSuccess: (state, action) => {
			state.detailedPost = action.payload;
			state.isDetailing = false;
			state.hasChange = false;
		},
		detailDataFailure: (state, action) => {
			state.isDetailing = false;
			state.detailingError = action.payload;
		},
		likeRequest: (state) => {
			state.isLikingDone = false;
		},
		likeSuccess: (state) => {
			state.hasChange = true;
		},
		likeFailure: (state) => {
			state.isLikingDone = false;
		},
		commentRequest: (state) => {
			state.isCommenting = false;
			state.commentingError = null;
		},
		commentSuccess: (state) => {
			state.isCommenting = false;
			state.hasChange = true;
		},
		commentFailure: (state, action) => {
			state.commentingError = action.payload;
			state.isCommenting = false;
		},
	},
});

export const {
	commentFailure,
	commentRequest,
	commentSuccess,
	openSidebar,
	openAnonymously,
	getDataRequest,
	getDataSuccess,
	getDataFailure,
	likeRequest,
	likeSuccess,
	changeMade,
	setDetailedPost,
	setDetailedProject,
	detailDataRequest,
	projectDataSuccess,
	postDataSuccess,
	detailDataFailure,
} = communitySlice.actions;

export default communitySlice.reducer;
