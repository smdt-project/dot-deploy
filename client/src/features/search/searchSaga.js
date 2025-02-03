import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { searchFailure, searchRequest, searchSuccess } from "./searchSlice";

function* workSearchSaga(action) {
	const query = action.payload.query;
	const tag = action.payload.tag;
	const page = action.payload.page;
	const url =
		tag === "all"
			? `?q=${query}`
			: tag === "user"
			? `/users?q=${query}&limit=15&page=${page}`
			: tag === "post"
			? `/posts?q=${query}&limit=15&page=${page}`
			: tag === "project"
			? `/projects?q=${query}&limit=15&page=${page}`
			: tag === "ui"
			? `/projects?q=${query}&type=ui`
			: `/projects?q=${query}&type=snippet`;
	try {
		const response = yield call(
			axios.get,
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/search${url}`,
			{
				withCredentials: true,
			}
		);
		if (tag === "all") {
			yield put(searchSuccess(response.data.data));
		} else if (tag === "post") {
			yield put(
				searchSuccess({
					projects: [],
					posts: response.data.data.docs,
					users: [],
				})
			);
		} else if (tag === "user") {
			yield put(
				searchSuccess({
					projects: [],
					posts: [],
					users: response.data.data.docs,
				})
			);
		} else {
			yield put(
				searchSuccess({
					projects: response.data.data.docs,
					posts: [],
					users: [],
				})
			);
		}
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(searchFailure(message));
	}
}

export function* watchSearchSaga() {
	yield takeLatest(searchRequest.type, workSearchSaga);
}
