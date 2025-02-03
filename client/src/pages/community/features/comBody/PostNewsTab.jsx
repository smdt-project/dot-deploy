import { useState } from "react";
import {
	BiComment,
	BiCommentAdd,
	BiLike,
	BiSolidComment,
	BiSolidLike,
} from "react-icons/bi";
import { MdArrowUpward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserName from "../../../../ui/UserName";
import { calcDayDifference } from "../../../../utils/helpers";
import { isCurrUserLiked } from "../../../../utils/validators";
import { likeRequest } from "../../communitySlice";
import Comment from "./Comment";

const PostNewsTab = ({ post }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);

	const isLiked = isUserSignedIn
		? isCurrUserLiked(post.likes, user.userId)
		: false;

	const [showComment, setShowComment] = useState(false);
	const hasComments = post.comments ? post.comments.length > 0 : false;

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const detailPost = () => {
		navigateTo(`/community/post/${post._id}`);
	};

	const goToPostOwner = () => {
		navigateTo(`/profile/${post.owner._id}`);
	};

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

	return (
		<div className="flex flex-col gap-3 bg-slate-900 bg-opacity-70 border-[1px] border-slate-800 rounded-md p-3">
			<div className="flex items-start gap-3">
				<div className="self-start flex items-center gap-3 min-w-10 w-10 h-10 overflow-hidden border-2 border-slate-800 rounded-full">
					{post.owner.avatarUrl ? (
						<img
							src={post.owner.avatarUrl}
							alt=""
							className={`w-full h-full self-start rounded-full border-[1px] border-color-5`}
						/>
					) : (
						<div
							className={`flex items-center justify-center w-full h-full self-start rounded-full border-[1px] border-color-5 bg-color-7 text-slate-950 text-2xl font-bold uppercase`}
						>
							{post.owner.name[0]}
						</div>
					)}
				</div>
				<div className=" flex flex-col py-[1px] font-sans">
					<div className="flex items-start gap-2">
						<span className="text-slate-300 text-sm capitalize">
							{post.owner.name}
						</span>
						<span className="text-slate-400 text-sm text-wrap">
							{post.title}
						</span>
					</div>
					<span className="text-[12px] text-slate-400">
						{calcDayDifference(Date.now(), Date.parse(post.updatedAt))}
					</span>
				</div>
			</div>
			<div className="flex items-start justify-between bg-slate-800 bg-opacity-60 px-4 py-3 rounded-md">
				<div className="w-full flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<UserName
							userUrl={post.owner.url}
							name={post.owner.name}
							avatarUrl={post.owner.avatarUrl}
							projectName={post.title}
							onOwner={goToPostOwner}
							onProject={detailPost}
						/>
						<span className="text-slate-300 text-sm">{post.description}</span>
					</div>
					<div className="w-full flex items-center justify-between">
						<div>
							<button
								className="flex items-center gap-2 font-semibold text-slate-400 bg-slate-700 bg-opacity-50 px-2 py-[1px] rounded-md transition-all duration-300 hover:underline hover:underline-offset-2 hover:bg-opacity-70"
								onClick={() => detailPost()}
							>
								<span className="pb-1">open post</span>
							</button>
						</div>
						<div className="flex items-center gap-2 text-sm">
							<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
								<button
									className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
										isLiked
											? "text-pink-500 bg-slate-700"
											: "hover:bg-slate-700 hover:text-slate-50"
									} px-2 py-[3px]  rounded-l-md transition-all duration-300`}
									onClick={() => handleLike()}
								>
									{isLiked ? <BiSolidLike /> : <BiLike />}
								</button>
								<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
									{post.likes.length}
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
									{hasComments ? post.comments.length : 0}
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
						onClick={() => detailPost()}
					>
						<BiCommentAdd /> Add comment
					</button>
					<div className="flex flex-col gap-4">
						{hasComments ? (
							<>
								{post.comments.map((comment, i) => (
									<Comment comment={comment} key={i} />
								))}
							</>
						) : (
							<div className="flex flex-col items-center gap-2 text-slate-300">
								<span>This Post has no comment yet</span>
								<button
									className="bg-slate-800 bg-opacity-60 px-2 py-[3px] rounded-md transition-all duration-300 hover:bg-opacity-100 hover:text-slate-50"
									onClick={() => detailPost()}
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

export default PostNewsTab;
