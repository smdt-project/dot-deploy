import { useDispatch, useSelector } from "react-redux";

import {
	updateCSS,
	updateHTML,
	updateJS,
	updateSelectedLng,
	updateSnippetCode,
} from "../pages/editor/projectSlice";

export const useCode = () => {
	const { project } = useSelector((state) => state.project);
	const dispatch = useDispatch();
	const isSnippet = project.type === "snippet";

	const updateCode = (value, lng) => {
		if (isSnippet) {
			dispatch(updateSnippetCode(value));
			dispatch(updateSelectedLng({ code: value, lng: lng }));
		} else {
			if (lng === "html") {
				dispatch(updateHTML(value));
				dispatch(updateSelectedLng({ code: value, lng: "html" }));
			} else if (lng === "css") {
				dispatch(updateCSS(value));
				dispatch(updateSelectedLng({ code: value, lng: "css" }));
			} else {
				dispatch(updateJS(value));
				dispatch(updateSelectedLng({ code: value, lng: "js" }));
			}
		}
	};

	return updateCode;
};
