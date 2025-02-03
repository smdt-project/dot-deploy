import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	codeFontSize: 24,
	codeTabSize: 4,
	autoSave: false,
	closeBrackets: true,
	lineNo: true,
	holder: "",
	foldGut: true,
	notifyInterval: 60,
};

export const settingSlice = createSlice({
	name: "setting",
	initialState: initialState,
	reducers: {
		updateCodeFontSize: (state, action) => {
			state.codeFontSize = action.payload;
		},
		updateCodeTabSize: (state, action) => {
			state.codeTabSize = action.payload;
		},
		setAutoSave: (state) => {
			state.autoSave = !state.autoSave;
		},
		setNotifyInterval: (state, action) => {
			state.notifyInterval = action.payload;
		},
		setCloseBrackets: (state) => {
			state.closeBrackets = !state.closeBrackets;
		},
		setLineNo: (state) => {
			state.lineNo = !state.lineNo;
		},
		setFoldGutter: (state) => {
			state.foldGut = !state.foldGut;
		},
		setPlaceholder: (state, action) => {
			state.holder = action.payload;
		},
		resetSettings: (state) => {
			state.codeFontSize = initialState.codeFontSize;
			state.codeTabSize = 4;
			state.autoSave = false;
			state.closeBrackets = true;
			state.lineNo = true;
			state.holder = "";
			state.foldGut = true;
		},
	},
});

export const {
	resetSettings,
	updateCodeFontSize,
	updateCodeTabSize,
	setAutoSave,
	setCloseBrackets,
	setFoldGutter,
	setLineNo,
	setPlaceholder,
	setNotifyInterval,
} = settingSlice.actions;

export default settingSlice.reducer;
