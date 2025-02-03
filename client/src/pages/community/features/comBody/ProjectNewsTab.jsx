import { useState } from "react";
import {
	BiComment,
	BiCommentAdd,
	BiSolidComment,
	BiSolidStar,
	BiStar,
} from "react-icons/bi";
import { GoCodeSquare } from "react-icons/go";
import { MdArrowUpward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEditorOpen } from "../../../../hooks/useEditorOpen";
import LngName from "../../../../ui/LngName";
import UserName from "../../../../ui/UserName";
import { calcDayDifference } from "../../../../utils/helpers";
import { isCurrUserLiked } from "../../../../utils/validators";
import { likeRequest } from "../../communitySlice";
import Comment from "./Comment";

const ProjectNewsTab = ({ project }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const [showComment, setShowComment] = useState(false);
	const isLiked = isUserSignedIn
		? isCurrUserLiked(project.likes, user.userId)
		: false;

	const isSnippet = project.type === "snippet";
	const hasComments = project.comments ? project.comments.length > 0 : false;
	const openEditor = useEditorOpen();
	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const handleProjectDetailing = () => {
		navigateTo(`/community/project/${project._id}`);
	};

	const goToProjectOwner = () => {
		navigateTo(`/profile/${project.owner._id}`);
	};

	const handleLike = () => {
		if (isUserSignedIn) {
			if (isLiked) {
				dispatch(
					likeRequest({
						to: project._id,
						isProject: true,
						type: "unlike",
					})
				);
			} else {
				dispatch(
					likeRequest({
						to: project._id,
						isProject: true,
						type: "like",
					})
				);
			}
		} else {
			navigateTo("/login");
		}
	};

	return (
		<div className="flex flex-col gap-3 bg-slate-900 bg-opacity-70 border-[1px] border-slate-800 rounded-md p-3">
			<div className="flex d:items-center gap-3">
				<div className="flex items-center gap-3 w-10 h-10 overflow-hidden border-2 border-slate-800 rounded-full">
					{project.owner.avatarUrl ? (
						<img
							src={project.owner.avatarUrl}
							alt=""
							className={`w-full h-full self-start rounded-full border-[1px] border-color-5`}
						/>
					) : (
						<div
							className={`flex items-center justify-center w-full h-full self-start rounded-full border-[1px] border-color-5 bg-color-7 text-slate-950 text-2xl font-bold uppercase`}
						>
							{project.owner.name[0]}
						</div>
					)}
				</div>
				<div className="flex flex-col py-[1px] font-sans">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-slate-300 text-sm">{project.owner.name}</span>
						<span className="text-slate-400 text-sm">
							created a{" "}
							{isSnippet
								? `code snippet with ${project.lngName}`
								: "ui component with html, css and js"}
						</span>
					</div>
					<span className="text-[12px] text-slate-400">
						{calcDayDifference(Date.now(), Date.parse(project.updatedAt))}
					</span>
				</div>
			</div>
			<div className="flex items-start justify-between bg-slate-800 bg-opacity-60 px-4 py-3 rounded-md">
				<div className="w-full flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<UserName
							userId={project.owner._id}
							name={project.owner.name}
							avatarUrl={project.owner.avatarUrl}
							projectName={project.name}
							onOwner={goToProjectOwner}
							onProject={handleProjectDetailing}
						/>
						<span className="text-slate-300 text-sm">
							{project.description}
						</span>
					</div>
					<div className="w-full flex items-center justify-between">
						<div className="flex items-center flex-wrap gap-3 text-slate-400 text-sm">
							<LngName isSnippet={isSnippet} name={project.lngName} />
							<button
								className="flex items-center gap-2 font-semibold bg-slate-700 bg-opacity-50 px-2 py-[1px] rounded-md transition-all duration-300 hover:underline hover:underline-offset-2 hover:bg-opacity-70"
								onClick={() => openEditor("open", project.lngName, project)}
							>
								<GoCodeSquare />
								<span className="pb-1">open with editor</span>
							</button>
						</div>
						<div className="self-end flex items-center gap-2 text-sm">
							<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
								<button
									className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
										isLiked
											? "text-color-2 bg-slate-700"
											: "hover:bg-slate-700 hover:text-slate-50"
									}`}
									onClick={() => handleLike()}
								>
									{isLiked ? <BiSolidStar /> : <BiStar />}
								</button>
								<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
									{project.likes.length}
								</span>
							</div>
							<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
								<button
									className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
										showComment
											? "text-blue-500 bg-slate-700"
											: "hover:bg-slate-700 hover:text-blue-500"
									}`}
									onClick={() => setShowComment((isShown) => !isShown)}
								>
									{showComment ? <BiSolidComment /> : <BiComment />}
								</button>
								<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
									{hasComments ? project.comments.length : 0}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showComment && (
				<div className="flex flex-col gap-5">
					<div className="flex items-center gap-5">
						<span className="text-slate-300">Comments</span>
						<button
							className="text-[13px] text-slate-400 bg-slate-900 px-2 rounded-md translate-x-0 duration-300 hover:bg-slate-800 hover:underline-offset-1 flex items-center gap-2"
							onClick={() => setShowComment(false)}
						>
							hide <MdArrowUpward />
						</button>
						<div className="flex-grow h-1 bg-gradient-to-l from-slate-800 to-transparent rounded-full " />
					</div>
					<button
						className="text-center bg-slate-800 bg-opacity-55 text-slate-400 px-3 py-1 rounded-md translate-x-0 duration-300 hover:bg-opacity-100 hover:underline-offset-1 flex items-center justify-center gap-2"
						onClick={() => handleProjectDetailing()}
					>
						<BiCommentAdd /> Add comment
					</button>
					<div className="flex flex-col gap-4">
						{hasComments ? (
							<>
								{project.comments.map((comment, i) => (
									<Comment comment={comment} key={i} />
								))}
							</>
						) : (
							<div className="flex flex-col items-center gap-2 text-slate-300">
								<span>This project has no project yet</span>
								<button
									className="bg-slate-800 bg-opacity-60 px-2 py-[3px] rounded-md transition-all duration-300 hover:bg-opacity-100 hover:text-slate-50"
									onClick={() => handleProjectDetailing()}
								>
									check and comment
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectNewsTab;
