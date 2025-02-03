import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCreating: true,
	showTerminal: true,
	showSideMenu: true,
	isPublishing: false,
	splitDxr: "horizontal",
	searchPanel: false,
	isOutput: true,
	logs: [],
	newProType: "ui",
	newProLngName: "html",
	newProName: "",
	isCreatingModalMinimized: false,
	isPublishingModalMinimized: false,
	publishingData: null,
	editorNotifications: [],
	isExpanding: false,
};

export const editorSlice = createSlice({
	name: "editor",
	initialState: initialState,
	reducers: {
		handleCreatingModal: (state, action) => {
			state.isCreating = action.payload;
		},
		setNewProject: (state, action) => {
			state.newProType = action.payload.type;
			state.newProLngName = action.payload.lngName;
		},
		handleTerminal: (state, action) => {
			state.showTerminal = action.payload;
		},
		handleSideMenu: (state, action) => {
			state.showSideMenu = action.payload;
		},
		handlePublishModal: (state, action) => {
			state.isPublishing = action.payload;
		},
		updateSplit: (state, action) => {
			state.splitDxr = action.payload;
		},
		resetEditor: (state) => {
			state.isCreating = initialState.isCreating;
			state.showTerminal = true;
			state.showSideMenu = true;
			state.isPublishing = initialState.isPublishing;
			state.splitDxr = initialState.splitDxr;
			state.searchPanel = initialState.searchPanel;
			state.logs = initialState.logs;
			state.isOutput = initialState.isOutput;
		},
		updateSearchQuery: (state) => {
			state.searchPanel = !state.searchPanel;
		},
		updateLogs: (state, action) => {
			state.logs = [...state.logs, action.payload];
		},
		resetLogs: (state) => {
			state.logs = [];
		},
		setOutputTerminal: (state, action) => {
			state.isOutput = action.payload;
		},
		minimizeCreatingModal: (state, action) => {
			state.isCreatingModalMinimized = true;
			state.newProName = action.payload;
			state.editorNotifications = [
				...state.editorNotifications,
				"You have on-process new project",
			];
		},
		maximizeCreatingModal: (state) => {
			state.isCreatingModalMinimized = false;
			state.editorNotifications = state.editorNotifications.filter(
				(noti) => noti !== "You have on-process new project"
			);
		},
		resetCreatingModal: (state) => {
			state.isCreatingModalMinimized = false;
			state.newProName = "";
			state.editorNotifications = state.editorNotifications.filter(
				(noti) => noti !== "You have on-process new project"
			);
		},
		minimizePublishingModal: (state, action) => {
			state.isExpanding = false;
			state.isPublishingModalMinimized = true;
			state.publishingData = action.payload;
			state.editorNotifications = [
				...state.editorNotifications,
				"You have minimized publishing window",
			];
		},
		maximizePublishingModal: (state) => {
			state.isExpanding = true;
			state.isPublishingModalMinimized = false;
			state.editorNotifications = state.editorNotifications.filter(
				(noti) => noti !== "You have minimized publishing window"
			);
		},
		resetPublishingModal: (state) => {
			state.isExpanding = false;
			state.isPublishingModalMinimized = false;
			state.publishingData = "";
			state.editorNotifications = state.editorNotifications.filter(
				(noti) => noti !== "You have minimized publishing window"
			);
		},
		resetNotifications: (state) => {
			state.editorNotifications = [];
		},
	},
});

export const {
	handleCreatingModal,
	handleTerminal,
	handleSideMenu,
	handlePublishModal,
	resetEditor,
	updateSplit,
	updateSearchQuery,
	updateLogs,
	resetLogs,
	setOutputTerminal,
	setNewProject,
	minimizeCreatingModal,
	maximizeCreatingModal,
	resetCreatingModal,
	resetNotifications,
	minimizePublishingModal,
	maximizePublishingModal,
	resetPublishingModal,
} = editorSlice.actions;

export default editorSlice.reducer;
