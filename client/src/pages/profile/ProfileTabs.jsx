import { BsPostcard } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiCodeBlock } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrTab } from "./profileSlice";

const tabs = [
	{ name: "projects", userT: "My projects", icon: <RiCodeBlock /> },
	{ name: "posts", userT: "My posts", icon: <BsPostcard /> },
	{ name: "comments", userT: "My comments", icon: <FaRegComment /> },
];

const ProfileBtn = ({ tab, isUser, isSideBar }) => {
	const { currTab } = useSelector((state) => state.profile);
	const dispatch = useDispatch();

	const handleClick = () => dispatch(changeCurrTab(tab.name));

	return (
		<button
			className={`${
				currTab === tab.name
					? "bg-color-7 text-slate-50"
					: "bg-slate-700 bg-opacity-50 text-slate-300"
			} relative font-semibold flex items-center justify-between gap-2 px-2 py-1 rounded-sm transition-all duration-300 hover:bg-color-7 hover:text-slate-50 text-[12px] sm:text-base`}
			onClick={() => handleClick()}
		>
			<div className="flex items-center gap-1">
				<div className="text-[12px] sm:text-base">{tab.icon}</div>
				<span className="capitalize ">{isUser ? tab.userT : tab.name}</span>
			</div>
			<span
				className={`${isSideBar ? "" : "hidden s:flex"} ${
					isUser
						? "absolute right-0 -top-3 sm:top-0 sm:right-0 sm:relative"
						: ""
				} text-slate-300 bg-slate-700 rounded-md shadow-sm shadow-slate-900 h-5 flex items-center justify-center sm:h-auto px-1`}
			>
				{tab.len}
			</span>
		</button>
	);
};

const ProfileTabs = ({ classes, isLoggedInUser, isSideBar, tabData }) => {
	return (
		<div className={classes}>
			{isSideBar && isLoggedInUser && (
				<ProfileBtn
					isUser={isLoggedInUser}
					tab={{
						name: "profile",
						userT: "Edit my profile",
						icon: <TbUserEdit />,
					}}
				/>
			)}
			<>
				{tabs.map((tab, index) => {
					return (
						<ProfileBtn
							key={index}
							tab={{ ...tab, len: tabData[index] }}
							isUser={isLoggedInUser}
							isSideBar={isSideBar}
						/>
					);
				})}
			</>
		</div>
	);
};

export default ProfileTabs;
