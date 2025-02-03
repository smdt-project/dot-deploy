import { BiComment } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";
import { GoCodeSquare } from "react-icons/go";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEditorOpen } from "../hooks/useEditorOpen";
import { isCurrUserLiked } from "../utils/validators";
import LngName from "./LngName";
import UserName from "./UserName";

const ProjectCard = ({ setIsSearching, project }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const isLiked = isUserSignedIn && isCurrUserLiked(project.likes, user.userId);

	const openEditor = useEditorOpen();
	const navigateTo = useNavigate();
	const isSnippet = project.type === "snippet";

	const handleProjectDetailing = () => {
		navigateTo(`/community/project/${project._id}`);
		setIsSearching(false);
	};
	const goToOwner = () => {
		navigateTo(`/profile/${project.owner._id}`);
		setIsSearching(false);
	};

	return (
		<div className="w-full flex flex-col gap-4  bg-slate-800 bg-opacity-90 px-4 py-3 rounded-md border-2 border-slate-800 border-opacity-50 transition-all duration-300 hover:border-color-5 hover:border-opacity-30">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<UserName
						name={project.owner.name}
						avatarUrl={project.owner.avatarUrl}
						projectName={project.name}
						onProject={handleProjectDetailing}
						onOwner={goToOwner}
					/>
					<div className="flex items-center gap-1">
						<span className="text-slate-300 bg-color-1 rounded-l-md px-3 text-sm py-[1px] bg-opacity-30">
							project
						</span>
						<span className="text-slate-300 bg-color-1 rounded-r-md px-3 text-sm py-[1px] bg-opacity-30">
							{project.type}
						</span>
					</div>
				</div>
				<span className="text-slate-300 text-sm">{project.description}</span>
			</div>
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center gap-2 text-slate-400 text-sm">
					<LngName isSnippet={isSnippet} name={project.lngName} />
					<button
						className="flex items-center gap-2 font-semibold bg-slate-700 bg-opacity-50 px-2 py-[1px] rounded-md transition-all duration-300 hover:underline hover:underline-offset-2 hover:bg-opacity-70"
						onClick={() => openEditor("open", project.lngName, project)}
					>
						<GoCodeSquare />
						<span className="pb-1">open with editor</span>
					</button>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
						<button
							className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
								isLiked
									? "text-pink-500 bg-slate-700"
									: "hover:bg-slate-700 hover:text-slate-50"
							}`}
							onClick={() => handleProjectDetailing()}
						>
							{isLiked ? <BsStarFill /> : <BsStar />}
						</button>
						<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
							{project.likes.length}
						</span>
					</div>
					<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
						<button
							className={`px-2 py-[3px]  rounded-l-md transition-all duration-300  hover:bg-slate-700 hover:text-slate-50`}
							onClick={() => handleProjectDetailing()}
						>
							<BiComment />
						</button>
						<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
							{project.comments.length}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
