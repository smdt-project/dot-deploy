import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { getUserData } from "../../features/auth/authData";
import { setNotifier } from "../../ui/notifierSlice";
import { setSavedProject } from "./features/editorheader/saveSlice";
import {
	updateProjectFailure,
	updateProjectRequest,
	updateProjectSuccess,
} from "./projectSlice";

function* workProjectUpdate(action) {
	const token = getUserData(true);
	try {
		const response = yield call(
			axios.patch,
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/projects/${
				action.payload._id
			}`,
			action.payload,
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		yield put(updateProjectSuccess());
		yield put(setSavedProject(response.data.updatedDoc));
		yield put(setNotifier({ success: "Your change is saved successfully!" }));
	} catch (error) {
		const message = error.response
			? error.response.data
				? error.response.data.message
				: error.message
			: error.message;
		yield put(updateProjectFailure(message));
		yield put(setNotifier({ error: error }));
	}
}

function* watchProjectUpdateSaga() {
	yield takeLatest(updateProjectRequest.type, workProjectUpdate);
}

export default watchProjectUpdateSaga;
