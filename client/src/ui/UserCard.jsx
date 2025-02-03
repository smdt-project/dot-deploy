import { useNavigate } from "react-router-dom";
import UserName from "./UserName";

const user = {
	userName: "sgc93",
	bio: "code for fun <> fun for life",
	avatarUrl: "/dot.svg",
	_id: "dfjsldjfsldfj3434dsjflsxjfsld",
};

const UserCard = ({ user }) => {
	const navigateTo = useNavigate();

	const detailUser = () => {
		navigateTo(`/profile/${user._id}`);
	};

	return (
		<div className="w-[49.4%] flex flex-col gap-4 bg-slate-800 bg-opacity-90 px-4 py-3 rounded-md border-2 border-slate-800 border-opacity-50 transition-all duration-300 hover:border-color-5 hover:border-opacity-30">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<UserName
						name={user.name}
						avatarUrl={user.avatarUrl}
						onOwner={detailUser}
					/>
					<span className="text-slate-300 bg-color-8 rounded-md px-3 text-sm py-[1px] bg-opacity-30">
						user
					</span>
				</div>
				<span className="text-slate-300 text-sm">{user.bio}</span>
			</div>
			<div>
				<button
					className="flex items-center gap-2 font-semibold text-slate-400 bg-slate-700 bg-opacity-50 px-2 py-[1px] rounded-md transition-all duration-300 hover:underline hover:underline-offset-2 hover:bg-opacity-70"
					onClick={() => detailUser()}
				>
					<span className="pb-1">See Profile</span>
				</button>
			</div>
		</div>
	);
};

export default UserCard;
