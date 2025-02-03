import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isCurrUserLiked } from "../utils/validators";
import UserName from "./UserName";

const PostCard = ({ post }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const isLiked = isUserSignedIn && isCurrUserLiked(post.likes, user.userId);
	const navigateTo = useNavigate();

	const detailPost = () => {
		navigateTo(`/community/post/${post._id}`);
	};
	const goToOwner = () => {
		navigateTo(`/profile/${post.owner._id}`);
	};

	return (
		<div className="w-full flex flex-col gap-4 bg-slate-800 bg-opacity-90 px-4 py-3 rounded-md border-2 border-slate-800 border-opacity-50 transition-all duration-300 hover:border-color-5 hover:border-opacity-30">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<UserName
						name={post.owner.name}
						avatarUrl={post.owner.avatarUrl}
						projectName={post.title}
						onProject={detailPost}
						onOwner={goToOwner}
					/>
					<span className="text-slate-300 bg-color-2 rounded-md px-3 text-sm py-[1px] bg-opacity-30">
						post
					</span>
				</div>
			</div>
			<div className="w-full flex items-center justify-between">
				<div>
					<button
						className="flex items-center gap-2 font-semibold text-slate-400 bg-slate-700 bg-opacity-50 px-2 py-[1px] rounded-md transition-all duration-300 hover:underline hover:underline-offset-2 hover:bg-opacity-70"
						onClick={() => navigateTo("/community/post")}
					>
						<span className="pb-1">Open Post</span>
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
							onClick={() => detailPost()}
						>
							{isLiked ? <BiSolidLike /> : <BiLike />}
						</button>
						<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
							{post.likes.length}
						</span>
					</div>
					<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
						<button
							className={`px-2 py-[3px]  rounded-l-md transition-all duration-300  hover:bg-slate-700 hover:text-slate-50`}
							onClick={() => detailPost()}
						>
							<BiComment />
						</button>
						<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
							{post.comments.length}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
