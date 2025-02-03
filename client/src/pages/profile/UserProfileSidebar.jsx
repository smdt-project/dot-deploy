import { BiUserCircle } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { TbUserCode } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import CreateNewBox from "../community/CreateNewBox";
import ProfileTabs from "./ProfileTabs";

const UserProfileSidebar = ({ user, isLoggedInUser }) => {
	return (
		<div className="h-full min-w-[13rem] w-[13rem] s:min-w-64 s:w-64 items-center hidden sm:flex flex-col gap-5 bg-slate-900 bg-opacity-70 border-r-2 border-slate-800 p-2 s:p-7">
			<div className=" flex items-center flex-col gap-4">
				{user.avatarUrl ? (
					<img
						src={user.avatarUrl}
						alt=""
						className={`min-w-32 min-h-32 w-32 h-32 self-start rounded-full border-[1px] border-color-5`}
					/>
				) : (
					<div
						className={`flex items-center justify-center min-w-32 min-h-32 w-32 h-32 self-start rounded-full border-[1px] border-color-5 bg-color-7 text-slate-950 text-[4.5rem] font-normal`}
					>
						{user.name[0]}
					</div>
				)}

				<div className="flex w-full items-center justify-between pt-2 self-end -mt-4">
					<NavLink
						to={-1}
						className={
							"text-slate-300 bg-slate-700 text-center px-2 rounded-md bg-opacity-50 hover:bg-opacity-90"
						}
					>
						<BsArrowLeft size={22} />
					</NavLink>
					{isLoggedInUser && <CreateNewBox />}
				</div>

				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-3 text-slate-300 border-b-[1px] border-slate-800 pb-1">
						<div>
							<BiUserCircle />
						</div>
						<span>{user.name}</span>
					</div>
					<div className="flex items-start gap-3 text-slate-300 border-b-[1px] border-slate-800 pb-2">
						<div className="pt-1">
							<TbUserCode />
						</div>
						<span className="text-wrap max-w-[10.2rem]">{user.bio}</span>
					</div>
					<div className="flex flex-wrap items-center gap-3 text-slate-300 border-b-[1px] border-slate-800 pb-1 p pt-1">
						<div>
							<MdOutlineEmail />
						</div>
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
				classes={
					"flex flex-col gap-2 mt-4 pt-2 border-t-[1px] border-slate-800"
				}
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

export default UserProfileSidebar;
