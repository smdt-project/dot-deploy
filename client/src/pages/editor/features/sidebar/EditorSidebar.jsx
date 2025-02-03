import { useState } from "react";
import { BiTerminal } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiHelp } from "react-icons/gi";
import {
	TbFiles,
	TbInfoCircle,
	TbSearch,
	TbSettings,
	TbWorld,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditorToolTip from "../../../../ui/EditorToolTip";
import { handleSideMenu, handleTerminal, resetEditor } from "../../editorSlice";
import { selectMenu } from "./sidebarSlice";

const SidebarTab = ({ tab }) => {
	const selectedTab = useSelector((state) => state.sidebar.currTab);
	const { showSideMenu, showTerminal } = useSelector((state) => state.editor);

	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const [isHovered, setIsHovered] = useState(false);

	const handleClick = (name) => {
		if (tab.isDisabled) return;

		if (tab.isLink) {
			if (tab.title === "Terminal") {
				dispatch(handleTerminal(!showTerminal));
			} else {
				dispatch(resetEditor());
				navigateTo(tab.link);
				return;
			}
		}

		if (name === selectedTab) {
			if (showSideMenu) {
				dispatch(handleSideMenu(false));
				dispatch(selectMenu({ name: "", title: "" }));
			}
		} else {
			dispatch(handleSideMenu(true));
			dispatch(selectMenu({ name: tab.name, title: tab.title }));
		}
	};

	return (
		<div
			className={`relative ${
				tab.isBtn ? "sm:hidden flex" : "flex"
			} items-center justify-center w-full `}
		>
			<button
				className={`w-full h-10 flex items-center justify-center  transition-all duration-300 border-l-2  ${
					tab.isDisabled
						? "text-slate-500 hover:text-n-3"
						: "text-slate-400 hover:text-n-1"
				}   ${
					tab.name === selectedTab && !tab.isDisabled
						? "border-l-2 border-n-1 text-n-1"
						: "border-[#353b47]"
				}`}
				onClick={() => handleClick(tab.name)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{tab.icon}
			</button>
			{isHovered && <EditorToolTip dxr={"left"} content={tab.name} />}
		</div>
	);
};

const Spacer = () => {
	return <div className=" flex flex-grow" />;
};

const EditorSidebar = () => {
	const { isCreating, isPublishing } = useSelector((state) => state.editor);
	const { user, isUserSignedIn } = useSelector((state) => state.auth);
	const { project } = useSelector((state) => state.project);

	return (
		<div className="h-full w-10 flex flex-col items-center bg-[#353b47] text-2xl sm:pb-2 border-r-[1px] border-slate-500">
			{[
				{
					icon: <TbFiles key={1} />,
					name: "explore",
					title: "Explore",
					isDisabled: isCreating || isPublishing,
					isLink: false,
				},
				{
					icon: <TbSearch key={2} />,
					name: "search",
					title: "Search Snippets and UI-Components",
					isDisabled: isCreating || isPublishing,
					isLink: false,
				},
				{
					icon: <BiTerminal key={3} />,
					name: "terminal",
					title: "Terminal",
					isDisabled: isCreating || isPublishing,
					isLink: true,
					isBtn: true,
				},
				{
					icon: <TbSettings key={3} />,
					name: "setting",
					title: "Settings & Customizations",
					isDisabled: isCreating || isPublishing,
					isLink: false,
				},
				{
					icon: <TbWorld size={25} key={4} />,
					name: "community",
					isDisabled: isPublishing,
					isLink: true,
					link: "/community",
				},
				{
					icon: <TbInfoCircle key={5} />,
					name: "about",
					isDisabled: isPublishing,
					isLink: true,
					link: "/",
				},
				0,
				{
					icon: <GiHelp key={6} />,
					name: "help",
					isDisabled: isPublishing,
					isLink: true,
					isBtn: true,
					link: "/community",
				},
				{
					icon: <CgProfile key={6} />,
					name: "profile",
					isDisabled: isPublishing,
					isLink: true,
					link: `${isUserSignedIn ? `/profile/${user.userId}` : "/login"}`,
				},
			].map((tab, index) =>
				tab ? (
					<SidebarTab tab={tab} index={index} key={index} />
				) : (
					<Spacer key={index} />
				)
			)}
		</div>
	);
};

export default EditorSidebar;
