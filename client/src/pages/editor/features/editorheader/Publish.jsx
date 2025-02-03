import { isEqual } from "lodash";
import { BiTerminal } from "react-icons/bi";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";
import { TbCloudCode, TbCloudPlus, TbCloudUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	handlePublishModal,
	maximizePublishingModal,
	resetPublishingModal,
} from "../../editorSlice";
import { updateProjectRequest } from "../../projectSlice";
import { setAutoSave } from "../sidebar/settingSlice";

const Publish = ({ selectAction }) => {
	const { isUserSignedIn } = useSelector((state) => state.auth);
	const { isNew, project } = useSelector((state) => state.project);
	const { autoSave, notifyInterval } = useSelector((state) => state.setting);
	const { savedProject } = useSelector((state) => state.save);
	const { user } = useSelector((state) => state.auth);
	const { isPublishingModalMinimized } = useSelector((state) => state.editor);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	let isOwnerIsThisUser = false;
	if (isUserSignedIn) {
		if (isNew) {
			isOwnerIsThisUser = true;
		} else if (project.owner._id) {
			isOwnerIsThisUser =
				project.owner._id.toString() === user.userId.toString();
		}
	}

	const handleSave = () => {
		if (isUserSignedIn) {
			const hasChanged = !isEqual(savedProject, project);
			if (hasChanged) {
				selectAction();
				dispatch(updateProjectRequest(project));
			} else {
				selectAction();
			}
		} else {
			navigateTo("/login");
		}
	};

	const handlePublish = () => {
		if (isUserSignedIn) {
			selectAction();
			dispatch(resetPublishingModal());
			dispatch(handlePublishModal(true));
		} else {
			navigateTo("/login");
		}
	};

	const maximizeModal = () => {
		dispatch(maximizePublishingModal());
		dispatch(handlePublishModal(true));
		selectAction();
	};

	const updateAutoSave = () => dispatch(setAutoSave());

	return (
		<>
			{isPublishingModalMinimized && (
				<div
					className={`flex items-start gap-2 p-2 border-b-[1px] border-slate-500 transition-all duration-300 text-slate-300 hover:bg-slate-500 hover:text-slate-50 hover:bg-opacity-50 cursor-pointer`}
					onClick={() => maximizeModal()}
				>
					<div>
						<BiTerminal size={23} />
					</div>
					<div className="flex flex-col">
						<span className="font-bold">Continue paused saving</span>
						<span className="text-sm">You have minimized saving terminal</span>
					</div>
				</div>
			)}
			<div
				className={`flex items-center gap-2 p-2 border-b-[1px] border-slate-500 ${
					isNew
						? "text-slate-300 transition-all duration-300 hover:bg-slate-500 hover:text-slate-50 hover:bg-opacity-50"
						: isOwnerIsThisUser
						? "text-slate-300 transition-all duration-300 hover:bg-slate-500 hover:text-slate-50 hover:bg-opacity-50"
						: "text-slate-500"
				} cursor-pointer`}
				onClick={() =>
					isNew ? handlePublish() : isOwnerIsThisUser ? handleSave() : {}
				}
			>
				<div>
					<TbCloudUpload size={23} />
				</div>
				<span className="font-bold">{isNew ? "Publish" : "Save"}</span>
			</div>
			<div
				className={`flex items-center gap-2 p-2 border-b-[1px] border-slate-500 transition-all duration-300 ${
					isNew && !project.owner
						? "text-slate-500"
						: "text-slate-300 hover:bg-slate-500 hover:text-slate-50 hover:bg-opacity-50"
				} cursor-pointer`}
				onClick={() => (isNew ? {} : handlePublish())}
			>
				<div>
					<TbCloudPlus size={23} />
				</div>
				<span className="font-bold">Save As</span>
			</div>
			<div
				className={`flex items-start gap-2 p-2 border-b-[1px] border-slate-500 transition-all duration-300 hover:bg-slate-500 text-slate-300 hover:text-slate-50 hover:bg-opacity-50 cursor-pointer`}
				onClick={() => updateAutoSave()}
			>
				<div>
					<TbCloudCode size={22} />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex-grow flex items-center justify-between gap-3">
						<span className="font-bold">Auto Save</span>
						{autoSave ? <FaToggleOn size={23} /> : <FaToggleOff size={23} />}
					</div>
					<span>
						<span className="text-color-5">Dotcode</span> will automatically
						save your changes if there is any in {notifyInterval} seconds
						interval
					</span>
				</div>
			</div>
		</>
	);
};

export default Publish;
