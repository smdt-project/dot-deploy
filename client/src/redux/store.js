import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "../features/auth/authSlice";
import signInReducer from "../features/auth/signin/signInSlice";
import signUpReducer from "../features/auth/signup/signUpSlice";
import searchReducer from "../features/search/searchSlice";
import communityReducer from "../pages/community/communitySlice";
import postReducer from "../pages/community/features/comSidebar/postSlice";
import editorReducer from "../pages/editor/editorSlice";
import saveReducer from "../pages/editor/features/editorheader/saveSlice";
import settingReducer from "../pages/editor/features/sidebar/settingSlice";
import sidebarReducer from "../pages/editor/features/sidebar/sidebarSlice";
import projectReducer from "../pages/editor/projectSlice";
import profileReducer from "../pages/profile/profileSlice";
import notifierReducer from "../ui/notifierSlice";
export const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		auth: authReducer,
		community: communityReducer,
		editor: editorReducer,
		notifier: notifierReducer,
		post: postReducer,
		profile: profileReducer,
		project: projectReducer,
		setting: settingReducer,
		sidebar: sidebarReducer,
		signUp: signUpReducer,
		signIn: signInReducer,
		save: saveReducer,
		search: searchReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

export default store;
