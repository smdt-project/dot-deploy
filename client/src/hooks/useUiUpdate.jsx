import { useDispatch, useSelector } from "react-redux";
import { updateSelectedLng } from "../pages/editor/projectSlice";

export const useUiUpdate = () => {
	const { project } = useSelector((state) => state.project);
	const dispatch = useDispatch();

	const handleSelection = (lngName) => {
		if (lngName === "html") {
			dispatch(updateSelectedLng({ code: project.code.html, lng: lngName }));
		} else if (lngName === "css") {
			dispatch(updateSelectedLng({ code: project.code.css, lng: lngName }));
		} else {
			dispatch(updateSelectedLng({ code: project.code.js, lng: lngName }));
		}
	};

	return handleSelection;
};
