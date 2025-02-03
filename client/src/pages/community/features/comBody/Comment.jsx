import { isEqual } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserName from "../../../../ui/UserName";
import { calcDayDifference } from "../../../../utils/helpers";

const Comment = ({ comment }) => {
	const { isUserSingedIn, user } = useSelector((state) => state.auth);
	const isUser =
		isUserSingedIn &&
		isEqual(user.userId.toString(), comment.owner._id.toString());

	const navigateTo = useNavigate();
	const goToOwner = () => navigateTo(`/profile/${comment.owner._id}`);

	return (
		<div className="flex flex-col gap-1 py-2">
			<div className="flex items-center gap-3 px-2 py-1 ">
				<UserName
					name={comment.owner.name}
					onOwner={goToOwner}
					avatarUrl={comment.owner.avatarUrl}
				/>
				{isUser && (
					<span className="text-[13px] bg-slate-700 px-2 h-[1.2rem] bg-opacity-60 font-code font-semibold flex items-center justify-center rounded-full text-color-5">
						you
					</span>
				)}
				<span className="text-[13px] text-slate-400">
					{calcDayDifference(Date.now(), Date.parse(comment.updatedAt))}
				</span>
			</div>
			<span className="text-sm text-slate-300 font-sans ml-10 border-b-[1px] border-slate-700 pb-2">
				{comment.comment}
			</span>
		</div>
	);
};

export default Comment;
