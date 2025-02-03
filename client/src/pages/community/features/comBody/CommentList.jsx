import { useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commentRequest } from "../../communitySlice";
import Comment from "./Comment";

const CommentList = ({ comments, toId, classes, commentedOn }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const [newComment, setNewComment] = useState("");
	const [isCommenting, setIsCommenting] = useState(false);

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const handleCommenting = () => {
		if (isUserSignedIn) {
			if (newComment === "") return;

			const comment = {
				owner: user.userId,
				comment: newComment,
			};

			dispatch(
				commentRequest({
					to: toId,
					isProject: commentedOn === "project",
					comment: comment,
				})
			);
		} else {
			navigateTo("/login");
		}
	};

	const startCommenting = () => {
		if (isUserSignedIn) {
			setIsCommenting(true);
		} else {
			navigateTo("/login");
		}
	};

	return (
		<div className="w-full flex flex-col gap-5">
			<div className="flex items-center gap-5">
				<span className="text-slate-300">Comments ({comments.length})</span>

				<div className="flex-grow h-1 bg-gradient-to-l from-slate-800 to-transparent rounded-full " />
			</div>
			<div
				className={`${classes} w-full  overflow-y-scroll flex flex-col gap-4`}
			>
				<>
					<div className="flex flex-col gap-2 px-3">
						<div className="flex items-center gap-2">
							{isUserSignedIn ? (
								<div className="self-start flex items-center gap-3 min-w-9 min-h-9 w-9 h-9 overflow-hidden border-2 border-slate-800 rounded-full">
									{user.avatarUrl ? (
										<img
											src={user.avatarUrl}
											alt=""
											className={`w-full h-full self-start rounded-full border-[1px] border-color-5`}
										/>
									) : (
										<div
											className={`flex items-center justify-center w-full h-full self-start rounded-full border-[1px] border-color-5 bg-color-7 text-slate-950 text-2xl font-bold uppercase`}
										>
											{user.name[0]}
										</div>
									)}
								</div>
							) : (
								<div
									className="flex items-center justify-center w-8 h-8 border-2 bg-slate-700 border-slate-700 rounded-full hover:bg-slate-600"
									onClick={() => navigateTo("/login")}
								>
									<BiCommentAdd />
								</div>
							)}
							<textarea
								type="text"
								className="bg-transparent border-b-2 border-slate-500 flex-grow h-7 outline-none focus:border-slate-300 px-3 text-slate-300 text-sm resize-none code-area"
								placeholder={`${
									isUserSignedIn
										? "add your comment here ..."
										: "login add your comment here ..."
								}`}
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								onFocus={() => startCommenting()}
							/>
						</div>
						{isCommenting && (
							<div className="flex items-center justify-end gap-2 ">
								<button
									className="bg-slate-700 px-3 py-1 rounded-full transition-all duration-300 hover:bg-slate-400 font-semibold text-red-500"
									onClick={() => {
										setIsCommenting(false);
										setNewComment("");
									}}
								>
									cancel
								</button>
								<button
									className={` ${
										newComment.length > 0
											? "bg-color-5 hover:bg-color-7"
											: "bg-slate-700 text-slate-400"
									} px-2 py-1 rounded-full transition-all duration-300 font-semibold`}
									onClick={() => handleCommenting()}
								>
									Comment
								</button>
							</div>
						)}
					</div>
					{comments.length > 0 ? (
						<div className="px-2">
							{comments.map((comment, i) => (
								<Comment comment={comment} key={i} />
							))}
						</div>
					) : (
						<div className="flex h-full flex-grow flex-col items-center gap-2 text-slate-400 py-10">
							<FaRegComment size={37} />
							<span>
								Be the first to say something about this {commentedOn}
							</span>
						</div>
					)}
				</>
			</div>
		</div>
	);
};

export default CommentList;
