import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { getUserData } from "../../features/auth/authData";
import { resetNotifier, setNotifier } from "../../ui/notifierSlice";
import {
	commentFailure,
	commentRequest,
	commentSuccess,
	detailDataFailure,
	detailDataRequest,
	getDataFailure,
	getDataRequest,
	getDataSuccess,
	likeRequest,
	likeSuccess,
	postDataSuccess,
	projectDataSuccess,
} from "./communitySlice";

function* workDetailingSagas(action) {
	const token = getUserData(true);
	const id = action.payload.id;
	const isProject = action.payload.isProject;
	const url = isProject
		? `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/projects/${id}`
		: `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/posts/${id}`;
	try {
		const response = yield call(
			axios.get,
			url,
			{},
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = response.data.data.doc;
		if (isProject) {
			yield put(projectDataSuccess(data));
		} else {
			yield put(postDataSuccess(data));
		}
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(detailDataFailure(message));
		yield put(resetNotifier());
		yield put(setNotifier({ error: message }));
	}
}

export function* watchDetailingSagas() {
	yield takeLatest(detailDataRequest.type, workDetailingSagas);
}

function* workCommentSaga(action) {
	const token = getUserData(true);
	const isProject = action.payload.isProject;
	const id = action.payload.to;
	let url = isProject
		? `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/projects/${id}/comments`
		: `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/posts/${id}/comments`;

	try {
		yield put(resetNotifier());
		yield put(setNotifier({ loading: "uploading comment ..." }));
		const response = yield call(axios.post, url, action.payload.comment, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const message = response.data.message;
		yield put(commentSuccess());
		yield put(resetNotifier());
		yield put(setNotifier({ success: message }));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(commentFailure(message));
		yield put(resetNotifier());
		yield put(setNotifier({ error: message }));
	}
}

export function* watchCommentSagas() {
	yield takeLatest(commentRequest.type, workCommentSaga);
}

function* workLikeSagas(action) {
	const token = getUserData(true);
	const isProject = action.payload.isProject;
	const url = isProject
		? `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/projects/${
				action.payload.type
		  }/${action.payload.to}`
		: `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/posts/${
				action.payload.type
		  }/${action.payload.to}`;
	try {
		const response = yield call(
			axios.patch,
			url,
			{},
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const message = response.data.message;
		yield put(likeSuccess());
		yield put(resetNotifier());
		yield put(setNotifier({ success: message }));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(likeSuccess(""));
		yield put(resetNotifier());
		yield put(setNotifier({ error: message }));
	}
}

export function* watchLikeSagas() {
	yield takeLatest(likeRequest.type, workLikeSagas);
}

function* workCommDataSagas() {
	try {
		const latestRes = yield call(
			axios.get,
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/latest`,
			{},
			{ withCredentials: true }
		);
		const proRes = yield call(
			axios.get,
			`${
				import.meta.env.VITE_REACT_APP_API_URL
			}/api/v1/projects?sort=likes&limit=5`,
			{},
			{ withCredentials: true }
		);
		const latests = latestRes.data.data.latests;
		const topProjects = proRes.data.data.docs;

		yield put(
			getDataSuccess({
				latests: latests,
				topProjects: topProjects,
				notifications: [],
			})
		);
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(getDataFailure(message));
	}
}

function* watchCommDataSagas() {
	yield takeLatest(getDataRequest.type, workCommDataSagas);
}

export default watchCommDataSagas;
