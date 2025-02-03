import { BiComment, BiLike, BiSolidComment, BiSolidLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../../../ui/BackBtn";
import CodeBox from "../../../../ui/CodeBox";
import UserName from "../../../../ui/UserName";
import { isCurrUserLiked } from "../../../../utils/validators";
import { likeRequest } from "../../communitySlice";
import CommentList from "./CommentList";
import ContentFooter from "./ContentFooter";

const TextContent = ({ content }) => {
	return (
		<div className="flex bg-slate-700 bg-opacity-30 p-5 rounded-md ">
			<p className="text-slate-300 text-wrap tracking-wide w-full overflow-x-scroll code-area">
				{`${content.value}`}
			</p>
		</div>
	);
};

const PostContent = ({ post }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const comments = post.comments;
	const commentOwners = comments.map((com) => com.owner._id);

	const isLiked = isUserSignedIn
		? isCurrUserLiked(post.likes, user.userId)
		: false;

	const isCommented = isUserSignedIn
		? isCurrUserLiked(commentOwners, user.userId)
		: false;

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const handleLike = () => {
		if (isUserSignedIn) {
			if (isLiked) {
				dispatch(
					likeRequest({
						to: post._id,
						isProject: false,
						type: "unlike",
					})
				);
			} else {
				dispatch(
					likeRequest({
						to: post._id,
						isProject: false,
						type: "like",
					})
				);
			}
		} else {
			navigateTo("/login");
		}
	};

	const goToOwner = () => navigateTo(`/profile/${post.owner._id}`);

	return (
		<div className="flex flex-col gap-4 sd:w-3/4 sd:h-full sd:p-7 sd:overflow-y-scroll small-scroll ">
			<div className="flex items-center justify-between gap-2 text-slate-300 font-bold text-lg pb-2">
				<UserName
					onOwner={goToOwner}
					name={post.owner.name}
					avatarUrl={post.owner.avatarUrl}
					projectName={post.title}
					onProject={() => {}}
				/>
				<div className="hidden sm:flex">
					<BackBtn />
				</div>
			</div>
			<div className=" flex flex-col gap-7 sm:p-5 sm:bg-slate-700 sm:bg-opacity-30 rounded-lg">
				<div className="flex flex-col gap-5 px-2">
					<h1 className="text-3xl tracking-wider text-slate-100  ">
						{post.title}
					</h1>
					<span className=" text-lg tracking-wider text-slate-300 ">
						{post.description}
					</span>
					<div className="flex items-center gap-2 text-sm py-2">
						<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
							<button
								className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
									isLiked ? "text-yellow-500 bg-slate-700" : ""
								} hover:bg-slate-700 hover:text-slate-50`}
								onClick={() => handleLike()}
							>
								{isLiked ? <BiSolidLike /> : <BiLike />}
							</button>
							<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
								{post.likes.length}
							</span>
						</div>
						<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
							<span
								className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
									isCommented ? "text-blue-500 bg-slate-700 " : ""
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

				<div className="flex flex-col gap-4">
					{post.contents.map((content, index) =>
						content.type === "text" ? (
							<TextContent key={index} content={content} />
						) : (
							<CodeBox
								key={index}
								project={{
									type: "snippet",
									code: { code: content.value },
									lngName: content.lngName,
								}}
							/>
						)
					)}
				</div>
				<ContentFooter
					ownerId={post.owner._id}
					ownerName={post.owner.name}
					createdAt={post.createdAt}
					updatedAt={post.updatedAt}
				/>
			</div>
			<CommentList
				comments={comments}
				classes={"code-area  border-b-2 border-slate-800 pb-4 rounded-b-md"}
				toId={post._id}
				commentedOn={"post"}
			/>
		</div>
	);
};

export default PostContent;
