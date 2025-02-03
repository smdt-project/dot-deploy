import { BiUserCircle } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { TbUserCode } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import CreateNewBox from "../community/CreateNewBox";
import ProfileTabs from "./ProfileTabs";

const ProfileHeader = ({ user, isLoggedInUser }) => {
	return (
		<div className="h-fit min-ful flex sm:hidden flex-col items-center gap-5 bg-slate-900 bg-opacity-70 border-b-2 border-slate-800 p-2 s:p-7">
			<div className=" flex items-center gap-4 p-3">
				<div className="flex flex-col justify-between h-full pl-3 -mb-5 pt-2 self-end -mt-4">
					<NavLink to={-1}>
						<BsArrowLeft />
					</NavLink>
					{isLoggedInUser && <CreateNewBox />}
				</div>

				<div className="flex items-center justify-center h-24 min-w-24 w-24 so:w-32 so:h-32 so:min-h-32 so:min-w-32 border-color-1 border-2 rounded-full overflow-hidden">
					{user.avatarUrl ? (
						<img
							src={user.avatarUrl}
							alt=""
							className={`w-full h-full self-start rounded-full border-[1px] border-color-5`}
						/>
					) : (
						<div
							className={`flex items-center justify-center w-full h-full self-start rounded-full border-[1px] border-color-5 bg-color-7 text-slate-950 text-[3.4rem] font-bold uppercase`}
						>
							{user.name[0]}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-3 text-slate-300 border-b-[1px] border-slate-800 pb-1">
						<BiUserCircle />
						<span>{user.name}</span>
					</div>
					<div className="flex items-start gap-3 text-slate-300 border-b-[1px] border-slate-800 pb-1">
						<div className="pt-1">
							<TbUserCode />
						</div>
						<span className="text-wrap max-w-[10.2rem]">{user.bio}</span>
					</div>
					<div className="flex flex-wrap items-center gap-3 text-slate-300 border-b-[1px] border-slate-800 pb-1 p pt-1">
						<MdOutlineEmail />
						<a
							href={`mailto:${user.email}`}
							className="transition-all duration-300 hover:underline hover:underline-offset-2 hover:text-color-5 line-clamp-1 max-w-[10.2rem] text-ellipsis"
						>
							{user.email}
						</a>
					</div>
				</div>
			</div>
			<ProfileTabs
				classes={"flex gap-2 pt-2 mx-2 border-t-[1px] border-slate-800"}
				isLoggedInUser={isLoggedInUser}
				isSideBar={true}
				tabData={[
					user.projects.length,
					user.posts.length,
					user.comments.length,
				]}
			/>
		</div>
	);
};

export default ProfileHeader;
