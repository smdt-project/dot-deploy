import { useEffect, useState } from "react";
import { BiExport, BiPaste, BiTerminal } from "react-icons/bi";
import { BsFileCode } from "react-icons/bs";
import { CgCommunity } from "react-icons/cg";
import { FaCss3, FaJs } from "react-icons/fa";
import { GoPaste } from "react-icons/go";
import { GrReactjs } from "react-icons/gr";
import { ImFileZip } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import { MdClose, MdDelete, MdMenu } from "react-icons/md";
import { PiCodeBold } from "react-icons/pi";
import { RiHtml5Line } from "react-icons/ri";
import { SiHtml5 } from "react-icons/si";
import {
	TbCopy,
	TbCut,
	TbHelp,
	TbInfoHexagon,
	TbTerminal,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useCode } from "../../../../hooks/useCode";
import LngTab from "../../../../ui/LngTab";
import {
	copyCode,
	exportCodeAsFile,
	exportCodeAsZip,
} from "../../../../utils/editorHelpers";
import { getLngInfo } from "../../../../utils/helpers";
import { supportedLng } from "../../../../utils/supportedLng";
import {
	handleCreatingModal,
	handleSideMenu,
	handleTerminal,
	maximizeCreatingModal,
	resetCreatingModal,
	setNewProject,
} from "../../editorSlice";
import { selectMenu } from "../sidebar/sidebarSlice";
import Publish from "./Publish";

const TabWithIcon = ({ title }) => {
	return (
		<div className="relative flex items-center gap-[2px]">
			<span>{title}</span>
			<div className="rounded-md p-[2px] ">
				<BiTerminal size={12} />
			</div>
		</div>
	);
};

const MenuTab = ({ tab, selectedTab, handleClick, children }) => {
	const isSelected = tab.title === selectedTab;

	const onSelectTab = (tab) => {
		handleClick(tab.title);
	};

	return (
		<div
			className={`${
				tab.title === "Settings" ||
				tab.title === "Terminal" ||
				tab.title === "Help"
					? "relative sm:flex hidden"
					: "relative"
			}`}
		>
			<button
				className={` sm:text-lg font-sans font-semibold px-2 rounded-md transition-all duration-300 cursor-pointer ${
					tab.isDisabled
						? " text-slate-500 hover:bg-slate-800 hover:bg-opacity-20  "
						: " text-slate-300 hover:bg-slate-600 hover:text-slate-50"
				} ${isSelected && !tab.isDisabled ? "bg-slate-600" : ""}`}
				onClick={() => onSelectTab(tab)}
			>
				{tab.hasMinimized ? (
					<TabWithIcon title={tab.title} />
				) : (
					<span>{tab.title}</span>
				)}
			</button>
			{isSelected && !tab.isDisabled && (
				<div
					className={`absolute z-[100] left-0 top-[135%] ${
						tab.title === "File" ? "min-w-72" : "min-w-[13.5rem] sm:min-w-72"
					} bg-[#3a404cfe] shadow-md shadow-n-13 rounded-sm p-1`}
				>
					{children}
				</div>
			)}
		</div>
	);
};

const LngIcon = (lngName) => {
	const [lng, setLng] = useState({});
	useEffect(() => {
		supportedLng.forEach((lng) => {
			if (lng.lngName === lngName.lngName) {
				setLng(lng);
			}
		});
	}, [lngName]);

	return (
		<div className="flex items-center gap-1 pl-5">
			{lng.icon}
			<span>{`${lng.title}.${lng.extension}`}</span>
		</div>
	);
};

const AboutCurrProject = ({ project, isNew }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	return (
		<div className="flex flex-col gap-1">
			{" "}
			<div>
				<span className="text-slate-300">name:</span>
				{isNew ? (
					<span
						className="px-2 text-slate-200"
						to={`/community/project/${project._id}`}
					>
						{project.name}
					</span>
				) : (
					<NavLink
						className="px-2 text-slate-200 underline underline-offset-4 transition-all duration-300 hover:text-color-5 line-clamp-1"
						to={`/community/project/${project._id}`}
					>
						{project.name}
					</NavLink>
				)}
			</div>
			<div>
				<span className="text-slate-300">created by:</span>
				{isNew ? (
					<NavLink
						className="px-2 text-slate-200 underline underline-offset-4 transition-all duration-300 hover:text-color-5"
						to={isUserSignedIn ? `/profile/${user.userId}` : `/login`}
					>
						You
					</NavLink>
				) : (
					<NavLink
						className="px-2 text-slate-200 underline underline-offset-4 transition-all duration-300 hover:text-color-5"
						to={`/profile/${project.owner._id}`}
					>
						{project.owner.name}
					</NavLink>
				)}
			</div>
			<div>
				<span className="text-slate-300">Prject type:</span>
				<NavLink className="px-2 text-slate-200">
					{`${project.type} with ${
						project.type === "snippet" ? project.lngName : "HTML, CSS and JS"
					}`}
				</NavLink>
			</div>
		</div>
	);
};

const languages = supportedLng.reverse();

const MenuTabContent = ({ tabName, selectAction }) => {
	const { isCreating, newProLngName, newProType, isCreatingModalMinimized } =
		useSelector((state) => state.editor);
	const { project, currCode, currLng, isNew } = useSelector(
		(state) => state.project
	);
	const [isHovered, setIsHovered] = useState(false);
	const [isAboutHovered, setIsAboutHovered] = useState(false);

	const currProjectName = project.name;
	const isSnippet = project.type === "snippet";

	const navigateTo = useNavigate();
	const updateCode = useCode();
	const dispatch = useDispatch();

	const handleClick = (type, lngName) => {
		dispatch(resetCreatingModal());
		dispatch(setNewProject({ type, lngName }));
		dispatch(handleCreatingModal(true));
		selectAction();
		navigateTo("/editor/code");
	};

	const expandCreatingModal = () => {
		dispatch(maximizeCreatingModal());
		dispatch(handleCreatingModal(true));
		selectAction();
	};

	const exportAsFile = () => {
		if (isSnippet) {
			const lngName = project.lngName;
			const info = getLngInfo(lngName);
			exportCodeAsFile([info.fileName], [info.title], [project.code.code]);
		} else {
			exportCodeAsFile(
				["index", "style", "script"],
				["html", "css", "js"],
				[project.code.html, project.code.css, project.code.js]
			);
		}
	};

	const exportAsZip = () => {
		if (isSnippet) {
			const lngName = project.lngName;
			const info = getLngInfo(lngName);
			exportCodeAsZip(currProjectName, [
				{
					fileName: info.fileName,
					extension: info.title,
					code: project.code.code,
				},
			]);
		} else {
			const files = [
				{ fileName: "index", extension: "html", code: project.code.html },
				{ fileName: "style", extension: "css", code: project.code.html },
				{ fileName: "script", extension: "js", code: project.code.html },
			];
			exportCodeAsZip(currProjectName, files);
		}
	};

	const handleCopy = async () => {
		await copyCode(currCode);
		selectAction();
	};

	const handleCut = async () => {
		await copyCode(currCode);
		updateCode("", currLng);
		selectAction();
	};

	const handlePaste = async (type) => {
		try {
			const newCode = await navigator.clipboard.readText();
			if (type === "append") {
				const updatedCode = currCode + "\n" + newCode;
				updateCode(updatedCode, currLng);
			} else {
				updateCode(newCode, currLng);
			}
			selectAction();
		} catch (err) {
			//
		}
	};

	const handleClear = async () => {
		updateCode("", currLng);
		selectAction();
	};

	switch (tabName) {
		case "File":
			return (
				<>
					{isCreatingModalMinimized && (
						<div
							className="flex gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
							onClick={() => expandCreatingModal()}
						>
							<div className="text-slate-300">
								<TbTerminal size={13} />
							</div>
							<div className="flex flex-col gap-1 -mt-[5px]">
								<span className="text-slate-300">Expand Creating Window</span>
								<span className="text-slate-400 text-sm">
									You have new unfinished creation of{" "}
									<span className="text-green-500 font-semibold font-sans">
										{newProType === "ui" ? "Ui-Component" : "Code-Snippet"}
									</span>{" "}
									with{" "}
									<span
										className="text-orange-500 font-semibold font-sans
								"
									>
										{newProType === "ui"
											? "Html, css and js"
											: newProLngName.toUpperCase()}
									</span>{" "}
								</span>
							</div>
						</div>
					)}
					<div
						className="flex gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
						onClick={() => handleClick("ui", "html")}
					>
						<div className="text-slate-300">
							<RiHtml5Line size={13} />
						</div>
						<div className="flex flex-col gap-1 -mt-[5px]">
							<span className="text-slate-300">New Ui-component</span>
							<span className="text-slate-400 text-sm">
								With{" "}
								<span className="text-red-500 font-semibold font-sans">
									HTML
								</span>
								,{" "}
								<span
									className="text-cyan-500 font-semibold font-sans
								"
								>
									CSS
								</span>{" "}
								and{" "}
								<span
									className="text-yellow-500 font-semibold font-sans uppercase
								"
								>
									Javascript
								</span>{" "}
								with integrated output displayer terminal.
							</span>
						</div>
					</div>
					<div
						className="flex gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
						onClick={() => handleClick("snippet", "react")}
					>
						<div className="text-slate-300">
							<GrReactjs size={13} />
						</div>
						<div className="flex flex-col gap-1 -mt-[5px]">
							<span className="text-slate-300">New Ui-component</span>
							<span className="text-slate-400 text-sm">
								With{" "}
								<span
									className="text-cyan-500 font-semibold font-sans
								"
								>
									React
								</span>{" "}
								and{" "}
								<span
									className="text-green-400 font-semibold font-sans
								"
								>
									tailwindcss
								</span>{" "}
								with integrated output displayer terminal.
							</span>
						</div>
					</div>
					<div
						className="flex items-start gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<div className="text-slate-300">
							<PiCodeBold />
						</div>
						<div className="relative w-full flex flex-col gap-1  -mt-[4px]">
							<span className="text-slate-300">New Code Snippet</span>
							<div className="w-full flex items-center justify-between text-slate-400 pt-1">
								<span className="-mt-1 text-sm">
									Select supported languages
								</span>
								<IoIosArrowForward
									className={`transition-all duration-300 ${
										isHovered ? "rotate-90" : "rotate-0"
									}`}
								/>
							</div>
							{isHovered && (
								<div className="flex flex-col gap-1 absolute z-[100] left-[61%] sm:left-[103%] bg-[#3a404cfe] shadow-md shadow-n-13 rounded-md py-2 min-w-44">
									{languages.map((lng, index) => (
										<LngTab lng={lng} key={index} handleClick={handleClick} />
									))}
								</div>
							)}
						</div>
					</div>
					<div className="my-2 border-t-[1px] border-slate-500" />
					<div
						className="flex items-start gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
						onMouseEnter={() => setIsAboutHovered(true)}
						onMouseLeave={() => setIsAboutHovered(false)}
					>
						<div className="text-slate-300">
							<TbInfoHexagon />
						</div>
						<div className="relative w-full flex flex-col gap-1  -mt-[4px]">
							<div className="flex flex-col gap-2 border-b-[1px] border-slate-500 pb-1">
								<div className="w-full flex items-center justify-between text-slate-400 pt-1">
									<span className="text-slate-300">Current Project</span>
									<IoIosArrowForward
										className={`transition-all duration-300 ${
											isAboutHovered ? "rotate-90" : "rotate-0"
										}`}
									/>
								</div>
								{!isAboutHovered && (
									<span className="-mt-1 text-sm text-slate-400">
										{isNew
											? "Check current status of this project"
											: "Check details about this project"}
									</span>
								)}
							</div>

							{isAboutHovered && (
								<AboutCurrProject project={project} isNew={isNew} />
							)}
						</div>
					</div>
				</>
			);
		case "Edit":
			return (
				<>
					<div className="flex flex-col gap-2 p-3">
						<button
							className="flex w-full items-center gap-2 py-1 px-2 rounded-sm bg-slate-600 bg-opacity-50 text-slate-300 transition-all duration-300 hover:text-slate-200 hover:bg-opacity-100 font-sans"
							onClick={() => handleCopy()}
						>
							<TbCopy size={14} />
							<span>
								Copy <span className="text-sm font-thin">(all)</span>
							</span>
						</button>
						<button
							className="flex w-full items-center gap-2 py-1 px-2 rounded-sm bg-slate-600 bg-opacity-50 text-slate-300 transition-all duration-300 hover:text-slate-200 hover:bg-opacity-100 font-sans"
							onClick={() => handleCut()}
						>
							<TbCut size={14} />
							<span>
								Cut <span className="text-sm font-thin">(all)</span>
							</span>
						</button>
						<button
							className="flex w-full items-center gap-2 py-1 px-2 rounded-sm bg-slate-600 bg-opacity-50 text-slate-300 transition-all duration-300 hover:text-slate-200 hover:bg-opacity-100 font-sans"
							onClick={() => handlePaste("append")}
						>
							<GoPaste size={14} />
							<span>Paste</span>
						</button>
						<button
							className="flex w-full items-center gap-2 py-1 px-2 rounded-sm bg-slate-600 bg-opacity-50 text-slate-300 transition-all duration-300 hover:text-slate-200 hover:bg-opacity-100 font-sans"
							onClick={() => handlePaste("override")}
						>
							<BiPaste size={14} />
							<span>
								Paste <span className="text-sm font-thin">(override)</span>
							</span>
						</button>
						<button
							className="flex w-full items-center jusce gap-2 py-1 px-2 rounded-sm bg-slate-600 bg-opacity-50 text-red-600 transition-all duration-300 hover:text-red-500 hover:bg-opacity-100 font-sans"
							onClick={() => handleClear()}
						>
							<MdDelete size={14} />
							<span>
								Clear <span className="text-sm font-thin">(all)</span>
							</span>
						</button>
					</div>
				</>
			);
		case "Save":
			return <Publish selectAction={selectAction} />;
		case "Export":
			return (
				<div className="flex gap-2  p-2">
					<div className="text-slate-300">
						<BiExport size={15} />
					</div>
					<div className="flex flex-col gap-1 -mt-[5px] w-full">
						<span className="text-slate-300">Export to local</span>
						<span className="text-slate-400 text-sm">
							Export{" "}
							<span className="font-bold font-sans text-color-5 underline">
								{currProjectName}
							</span>{" "}
							as:
						</span>
						<div className="flex flex-col gap-2 pt-3">
							<button
								className="flex flex-col w-full gap-1 py-1 px-2 rounded-sm bg-slate-600 bg-opacity-50 text-slate-300 transition-all duration-300 hover:text-slate-200 hover:bg-opacity-100 font-sans"
								onClick={() => exportAsZip()}
							>
								<div className="flex items-center gap-2">
									<ImFileZip size={13} />
									<span>Export .zip file</span>
								</div>
								<div className="pl-5 text-slate-400">
									as{" "}
									<span className="text-color-5">
										{currProjectName.split(" ").join("_")}.zip
									</span>
								</div>
							</button>
							<button
								className="flex flex-col w-full gap-1 py-1 px-2 rounded-sm bg-slate-600 bg-opacity-50 text-slate-300 transition-all duration-300 hover:text-slate-200 hover:bg-opacity-100 font-sans"
								onClick={() => exportAsFile()}
							>
								<div className="flex items-center gap-2">
									<BsFileCode size={14} />
									<span>Export as individual files</span>
								</div>
								<div>
									{isSnippet ? (
										<LngIcon lngName={currLng} />
									) : (
										<div className="flex flex-col items-start pl-5 text-slate-400">
											<div className="flex items-center gap-1">
												<SiHtml5 className=" text-red-500" size={12} />
												<span>index.html</span>
											</div>
											<div className="flex items-center gap-1">
												<FaJs className=" text-yellow-500" size={12} />
												<span className="text-yellow-500">script.js</span>
											</div>
											<div className="flex items-center gap-1">
												<FaCss3 className=" text-cyan-400" size={12} />
												<span className="text-cyan-500">style.css</span>
											</div>
										</div>
									)}
								</div>
							</button>
						</div>
					</div>
				</div>
			);
		case "Help":
			return (
				<div className="flex gap-2  p-2">
					<div className="text-slate-300">
						<TbHelp size={15} />
					</div>
					<div className="flex flex-col gap-1 -mt-[5px] w-full">
						<span className="text-slate-300">Help</span>
						<span className="text-slate-400 text-sm">Ask help from:</span>
						<div className="flex flex-col gap-2 pt-3">
							<button
								className="flex w-full items-center gap-2 py-1 px-2 rounded-sm bg-slate-600 bg-opacity-50 text-slate-300 transition-all duration-300 hover:text-slate-200 hover:bg-opacity-100 font-sans"
								onClick={() => navigateTo("/community")}
							>
								<CgCommunity size={20} />
								<span>Community</span>
							</button>
						</div>
					</div>
				</div>
			);
		default:
			break;
	}
};

const EditorMenu = ({ show, setShow }) => {
	const {
		isCreating,
		showTerminal,
		isPublishing,
		isCreatingModalMinimized,
		isPublishingModalMinimized,
	} = useSelector((state) => state.editor);
	const [selectedTab, setSelectedTab] = useState("");
	const dispatch = useDispatch();

	const handleClick = (tabName) =>
		setSelectedTab((selectedTab) => (selectedTab === tabName ? "" : tabName));

	const selectAction = () => setSelectedTab("");

	const onTerminalClick = (isDisabled) => {
		if (!isDisabled) {
			dispatch(handleTerminal(!showTerminal));
			selectAction();
		}
	};

	const onSettingClick = () => {
		dispatch(handleSideMenu(true));
		dispatch(
			selectMenu({ name: "setting", title: "Settings & Customizations" })
		);
		selectAction();
	};

	return (
		<div className="flex justify-between">
			{show && (
				<div
					className="flex sm:hidden text-slate-300 p-1 rounded-md mx-2 transition-all duration-300 hover:bg-slate-600 cursor-pointer"
					onClick={() => setShow(false)}
				>
					<MdMenu size={22} />
				</div>
			)}
			<div className={`${show ? "hidden" : "flex"} sm:flex items-center px-4`}>
				{[
					{
						title: "File",
						isDisabled: isPublishing,
						hasMinimized: isCreatingModalMinimized,
					},
					{
						title: "Edit",
						isDisabled: isCreating || isPublishing,
					},
					{
						title: "Save",
						isDisabled: isCreating || isPublishing,
						hasMinimized: isPublishingModalMinimized,
					},
					{ title: "Export", isDisabled: isCreating || isPublishing },
					{
						title: "Settings",
						isDisabled: isCreating || isPublishing,
						isLink: true,
						click: () => onSettingClick(),
					},
					{
						title: "Terminal",
						isDisabled: isCreating || isPublishing,
						isLink: true,
						click: () => onTerminalClick(isCreating || isPublishing),
					},
					{ title: "Help", isDisabled: isCreating || isPublishing },
				].map((tab, index) => (
					<MenuTab
						key={index}
						tab={tab}
						handleClick={tab.isLink ? tab.click : handleClick}
						selectedTab={selectedTab}
					>
						<MenuTabContent tabName={tab.title} selectAction={selectAction} />
					</MenuTab>
				))}
			</div>
			{!show && (
				<button
					className={`flex sm:hidden text-slate-300 p-1 rounded-md mx-2 transition-all duration-300 hover:bg-slate-600 cursor-pointer`}
					onClick={() => {
						setShow(true);
						selectAction();
					}}
				>
					<MdClose size={22} />
				</button>
			)}
		</div>
	);
};

export default EditorMenu;
