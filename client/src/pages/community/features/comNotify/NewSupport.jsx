import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLngInfo } from "../../../../utils/helpers";
import {
	handleCreatingModal,
	resetCreatingModal,
	setNewProject,
} from "../../../editor/editorSlice";

const lng = {
	lngName: "react",
	description: "Our code editor supports REACT starting from today",
};
const NewSupport = () => {
	const detailInfo = getLngInfo(lng.lngName);
	const lngInfo = { ...detailInfo, ...lng };
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const open = (type, lngName) => {
		dispatch(resetCreatingModal());
		dispatch(setNewProject({ type, lngName }));
		dispatch(handleCreatingModal(true));
		navigateTo("/editor/code");
	};

	return (
		lngInfo && (
			<div className="flex flex-col gap-2 min-h-[10rem] d:min-h-52 bg-[url('/assets/gradient1.svg')] bg-cover border-2 border-slate-800 rounded-md px-3 py-2 overflow-hidden">
				<div className="text-2xl uppercase bg-gradient-to-tl from-color-3 via-color-2 to-color-5 bg-clip-text text-transparent font-bold">
					Try New Language!
				</div>
				<span className="text-slate-200">{lngInfo.description}</span>
				<span className=" text-slate-300 text-sm">
					Write, edit with highlighting, be assisted with hints and built
					efficient line of codes.
				</span>
				<button
					className="self-start bg-slate-900 bg-opacity-50 text-slate-300 font-semibold text-sm px-3 py-1 rounded-full transition-all duration-300 hover:bg-opacity-80 hover:text-slate-50 hover:shadow-md hover:shadow-n-6"
					onClick={() => open("snippet", "swift")}
				>
					Try it now!
				</button>
				<div className="block self-end -translate-y-12">
					<div className="-rotate-[170deg] -translate-x-1 translate-y-8 text-orange-500 scale-[6]">
						{lngInfo.icon}
					</div>
					<div className="-rotate-[120deg] -translate-x-20 translate-y-6 text-slate-600 scale-[2]">
						{lngInfo.icon}
					</div>
				</div>
			</div>
		)
	);
};

export default NewSupport;
