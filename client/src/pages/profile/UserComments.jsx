import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { BiComment, BiCommentAdd } from "react-icons/bi";
import { MdClose, MdDelete } from "react-icons/md";
import { PiWarningFill } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import UserName from "../../ui/UserName";
import { deleteItemRequest } from "./profileSlice";

const Comment = ({ comment, isLoggedInUser }) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const isOnProject = comment.project.type;

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const detailProject = () =>
		navigateTo(
			`/community/${isOnProject ? "project" : "post"}/${comment.project._id}`
		);

	const detailOwner = () => navigateTo(`/profile/${comment.project.owner._id}`);

	const handleDelete = () => {
		setIsDeleting(false);
		dispatch(deleteItemRequest({ itemName: "comment", id: comment._id }));
	};

	return (
		<div className="sd:w-2/3 flex flex-col gap-3 bg-slate-900 bg-opacity-70 border-[1px] border-slate-800 rounded-md p-3">
			<div className="flex items-start justify-between gap-3 bg-slate-800 bg-opacity-60 px-4 py-3 rounded-md">
				<div className="text-slate-300 flex items-start gap-2">
					<div className="mt-1 text-slate-400">
						<BiComment />
					</div>
					<span className=" text-wrap text-slate-300">{comment.comment}</span>
				</div>
				{isLoggedInUser && (
					<div className="relative flex items-center gap-2">
						{isDeleting ? (
							<div className=" absolute top-0 right-0 w-max flex flex-col gap-3 bg-n-13 border-[1px] border-red-500 p-3 rounded-lg">
								<div className="flex items-center gap-3 justify-between">
									<div className="sm:text-base text-red-500 text-sm flex items-center font-semibold gap-2">
										<div className=" ">
											<PiWarningFill />
										</div>
										Are you sure you want to delete this comment?
									</div>
									<button
										className="text-slate-400 hover:text-slate-300"
										onClick={() => setIsDeleting(false)}
									>
										<MdClose />
									</button>
								</div>
								<div className="w-full flex items-center gap-3 justify-end">
									<button
										className="flex items-center justify-center gap-2 text-slate-200 bg-slate-500 bg-opacity-40 px-2 py-[3px] rounded-md transition-all duration-300 hover:bg-opacity-60 hover:text-slate-50 font-semibold"
										onClick={() => setIsDeleting(false)}
									>
										<span>Cancel </span>
									</button>
									<button
										className="flex items-center justify-center gap-2 text-slate-200 bg-red-500 bg-opacity-40 px-2 py-[3px] rounded-md transition-all duration-300 hover:bg-opacity-60 hover:text-slate-50 font-semibold"
										onClick={() => handleDelete()}
									>
										<MdDelete />
										<span>Sure delete</span>
									</button>
								</div>
							</div>
						) : (
							<>
								<button
									className="text-red-500 bg-slate-500 bg-opacity-40 p-[3px] rounded-md transition-all duration-300 hover:bg-red-500 hover:text-red-50"
									onClick={() => setIsDeleting(true)}
								>
									<MdDelete />
								</button>
							</>
						)}
					</div>
				)}
			</div>
			<span className="text-slate-400">Commented on:</span>
			<div className="mx-4 flex items-start justify-between gap-3 bg-slate-800 bg-opacity-30 px-4 py-3 rounded-md">
				<UserName
					avatarUrl={comment.project.owner.avatarUrl}
					name={comment.project.owner.name}
					projectName={
						isOnProject ? comment.project.name : comment.project.title
					}
					onProject={detailProject}
					onOwner={detailOwner}
				/>
				{comment.project.comments.length > 1 && (
					<div className="flex items-center gap-3">
						<div>
							<BiCommentAdd />
						</div>
						<span>{comment.project.comments.length}</span>
					</div>
				)}
			</div>
		</div>
	);
};

const UserComments = ({ isLoggedInUser }) => {
	const { userData } = useSelector((state) => state.profile);

	const comments = userData.comments;

	return comments.length > 0 ? (
		<div className="flex flex-col justify-center sd:items-start gap-3 sd:gap-7 px-2 sd:flex-row sd:flex-wrap pb-3">
			{comments.map((comment, index) => (
				<Comment
					comment={comment}
					key={index}
					isLoggedInUser={isLoggedInUser}
				/>
			))}
		</div>
	) : (
		<div className="flex flex-col items-center justify-center gap-3 w-full h-full pb-40">
			{isLoggedInUser ? (
				<>
					<span className="text-slate-300 text-lg">
						You have not commented on any projects or posts yet
					</span>
					<NavLink
						className="text-slate-300 bg-slate-700 bg-opacity-60 px-4 py-2 rounded-full transition-all duration-300 hover:text-slate-50 hover:bg-opacity-80"
						to={"/community"}
					>
						Explore community
					</NavLink>
				</>
			) : (
				<>
					<span className="text-slate-300 font-semibold tracking-wide text-lg">
						User has not commented on any posts or projects yet
					</span>
					<NavLink
						to={"/community"}
						className="text-slate-400 hover:text-slate-300 hover:underline hover:underline-offset-2"
					>
						Go to community
					</NavLink>
				</>
			)}
		</div>
	);
};

export default UserComments;
