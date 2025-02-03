import { all, fork } from "redux-saga/effects";
import {
	watchLogoutSagas,
	watchUserDataSagas,
} from "../features/auth/authSaga";
import { watchSignInSagas } from "../features/auth/signin/signInSaga";
import { watchSignUpSagas } from "../features/auth/singup/signUpSaga";
import watchCommDataSagas, {
	watchCommentSagas,
	watchDetailingSagas,
	watchLikeSagas,
} from "../pages/community/communitySaga";
import watchPostCreateSagas, {
	watchPostDeleteSagas,
	watchPostUpdateSagas,
} from "../pages/community/features/comSidebar/postSaga";
import watchSaveSagas from "../pages/editor/features/editorheader/saveSaga";
import watchProjectUpdateSaga from "../pages/editor/projectSaga";
import watchProfileSaga, {
	watchItemDeleteSaga,
} from "../pages/profile/profileSaga";
import { watchSearchSaga } from "../features/search/searchSaga";

function* rootSaga() {
	yield all([
		fork(watchSignUpSagas),
		fork(watchSignInSagas),
		fork(watchLogoutSagas),
		fork(watchUserDataSagas),
		fork(watchProfileSaga),
		fork(watchSaveSagas),
		fork(watchProjectUpdateSaga),
		fork(watchCommDataSagas),
		fork(watchLikeSagas),
		fork(watchCommentSagas),
		fork(watchDetailingSagas),
		fork(watchPostCreateSagas),
		fork(watchPostUpdateSagas),
		fork(watchPostDeleteSagas),
		fork(watchItemDeleteSaga),
		fork(watchSearchSaga),
	]);
}

export default rootSaga;
