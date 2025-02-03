import { BiComment, BiSolidComment, BiSolidStar, BiStar } from "react-icons/bi";
import { GoCodeSquare } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEditorOpen } from "../../../../hooks/useEditorOpen";
import BackBtn from "../../../../ui/BackBtn";
import LngName from "../../../../ui/LngName";
import UserName from "../../../../ui/UserName";
import UserReactComponent from "../../../../ui/UserReactComponent";
import { isCurrUserLiked } from "../../../../utils/validators";
import { likeRequest } from "../../communitySlice";
import CommentList from "./CommentList";
import ContentFooter from "./ContentFooter";
import ResultFrame from "./ResultFrame";

const AboutProject = ({ project, goToOwner }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const comments = project.comments;
	const commentOwners = comments.map((com) => com.owner._id);

	const isLiked = isUserSignedIn
		? isCurrUserLiked(project.likes, user.userId)
		: false;

	const isCommented = isUserSignedIn
		? isCurrUserLiked(commentOwners, user.userId)
		: false;
	const isSnippet = project.type === "snippet";

	let htmlCode = "";
	let cssCode = "";
	let jsCode = "";

	if (!isSnippet) {
		htmlCode = project.code.html;
		cssCode = project.code.css;
		jsCode = project.code.js;
	}

	const srcDoc = `
		<html>
			<style>${cssCode} </style>
			<body>
				${htmlCode ? htmlCode : ""}
			</body>
			/override/
			<script>${jsCode}</script>
		</html>
		`;

	const hasOutput = !isSnippet || project.lngName === "react";

	const openEditor = useEditorOpen();
	const navigateTo = useNavigate();
	const dispatch = useDispatch();

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
		<div className="sd:w-1/2 flex flex-col gap-3 bg-slate-800 bg-opacity-70 border-[1px] border-slate-800 rounded-md p-3">
			<div className="flex items-start justify-between bg-slate-800 bg-opacity-60 px-4 py-3 rounded-md">
				<div className="w-full flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<UserName
								onOwner={goToOwner}
								name={project.owner.name}
								avatarUrl={project.owner.avatarUrl}
								projectName={project.name}
								onProject={() => {}}
							/>
							<div className="hidden sm:flex">
								<BackBtn />
							</div>
						</div>
						<span className="text-slate-300 text-sm">
							{project.description}
						</span>
						<div className="max-h-12 flex flex-wrap items-start gap-1 line-clamp-2">
							{project.tags.map((tag, index) => (
								<span
									className="text-sm text-slate-400 bg-slate-700 px-1 rounded-md transition-all duration-300 hover:bg-color-7 hover:text-slate-200 cursor-pointer"
									key={index}
								>
									#{tag}
								</span>
							))}
						</div>
					</div>
					<div className="w-full flex items-center justify-between">
						<div className="flex flex-wrap items-center gap-2 text-slate-400 text-sm">
							<LngName name={project.lngName} isSnippet={isSnippet} />
							<button
								className="flex items-center gap-2 font-semibold bg-slate-700 bg-opacity-50 px-2 py-[1px] rounded-md transition-all duration-300 hover:underline hover:underline-offset-2 hover:bg-opacity-70"
								onClick={() => openEditor("open", project.lng, project)}
							>
								<GoCodeSquare />
								<span className="pb-1">open with editor</span>
							</button>
						</div>
						<div className="self-end flex items-center gap-2 text-sm">
							<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
								<button
									className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
										isLiked ? "text-color-2 bg-slate-700" : ""
									} hover:bg-slate-700 hover:text-slate-50`}
									onClick={() => handleLike()}
								>
									{isLiked ? <BiSolidStar /> : <BiStar />}
								</button>
								<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
									{project.likes.length}
								</span>
							</div>
							<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
								<span
									className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
										isCommented ? "text-blue-500 bg-slate-700" : ""
									}`}
								>
									{isCommented ? <BiSolidComment /> : <BiComment />}
								</span>
								<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
									{comments.length}
								</span>
							</div>
						</div>
					</div>
					<ContentFooter
						ownerId={project.owner._id}
						ownerName={project.owner.name}
						createdAt={project.createdAt}
						updatedAt={project.updatedAt}
					/>
				</div>
			</div>
			{hasOutput && (
				<>
					<div className="flex items-center justify-center flex-grow h-44 bg-n-14 border-[1px] border-[#555] ">
						{project.lngName === "react" ? (
							<div className="w-full h-full overflow-scroll relative p-5 code-area">
								<UserReactComponent userJsx={project.code.code} />
							</div>
						) : (
							<ResultFrame srcDoc={srcDoc} />
						)}{" "}
					</div>
					<div className="flex border-b-[1px] border-[#555]" />
				</>
			)}
			<div className="hidden sd:flex">
				<CommentList
					comments={comments}
					toId={project._id}
					commentedOn={"project"}
					classes={`small-scroll ${
						isSnippet ? "max-h-[24.3rem]" : "h-[12rem]"
					}`}
				/>
			</div>
		</div>
	);
};

export default AboutProject;
