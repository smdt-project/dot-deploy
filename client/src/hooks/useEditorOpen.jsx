import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	handleCreatingModal,
	handleTerminal,
	resetCreatingModal,
	resetEditor,
	resetLogs,
	resetPublishingModal,
	setOutputTerminal,
	updateLogs,
} from "../pages/editor/editorSlice";
import { setLastSave } from "../pages/editor/features/editorheader/saveSlice";
import { selectMenu } from "../pages/editor/features/sidebar/sidebarSlice";
import {
	resetCurrProject,
	setCurrProject,
	updateSelectedLng,
} from "../pages/editor/projectSlice";

export const useEditorOpen = () => {
	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const openEditor = (type, lngName, project) => {
		dispatch(resetEditor());
		dispatch(resetCurrProject());
		dispatch(resetCreatingModal());
		dispatch(resetPublishingModal());

		if (type === "open") {
			dispatch(setCurrProject({ isNew: false, project: project }));
			if (project.type === "snippet") {
				dispatch(
					updateSelectedLng({ code: project.code.code, lng: project.lngName })
				);
				if (project.lngName === "react") {
					dispatch(setOutputTerminal(true));
				} else {
					dispatch(setOutputTerminal(false));
				}
			} else {
				dispatch(updateSelectedLng({ code: project.code.html, lng: "html" }));
				dispatch(setOutputTerminal(true));
			}
		} else {
			dispatch(
				setCurrProject({
					isNew: true,
					project: project,
				})
			);
			if (type === "ui") {
				dispatch(setOutputTerminal(true));
				dispatch(updateSelectedLng({ code: project.code.html, lng: "html" }));
			} else {
				if (lngName === "react") {
					dispatch(setOutputTerminal(true));
				} else {
					dispatch(setOutputTerminal(false));
				}
				dispatch(updateSelectedLng({ code: project.code.code, lng: lngName }));
			}
		}

		dispatch(handleCreatingModal(false));
		dispatch(resetLogs());
		dispatch(
			updateLogs(
				JSON.stringify({
					type: "info",
					info: JSON.stringify(project, null, 2),
				})
			)
		);

		dispatch(handleTerminal(true));
		dispatch(selectMenu({ name: "explore", title: "Explore" }));
		navigateTo("/editor/code");
		dispatch(setLastSave({ at: Date.now(), project }));
	};

	return openEditor;
};
