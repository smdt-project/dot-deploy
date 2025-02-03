import { useState } from "react";
import { BiCodeBlock, BiDotsVerticalRounded } from "react-icons/bi";
import { CgHome, CgUiKit } from "react-icons/cg";
import { FaNode, FaReact } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowDownward, MdClose } from "react-icons/md";
import { TbApi, TbUserCode, TbWorldCode } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Grid from "../../ui/Grid";
import Logo from "../../ui/Logo";
import NavBtn from "../../ui/NavBtn";
import { featuresContent } from "../../utils/constants";

const SideNavHeader = ({ handleNav, isHome }) => {
	return (
		<div className="w-full flex justify-between items-center border-b-2 border-n-6 py-4 pr-4 pl-7 backdrop-blur-md">
			<Logo isHome={isHome} />
			<Button
				onClick={() => handleNav()}
				className={"text-n-2 hover:text-n-1 transition-all duration-300"}
			>
				<MdClose size={23} />
			</Button>
		</div>
	);
};

const ResourceLink = ({ handleNav, link }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<a
			className={`text-slate-300 font-semibold flex flex-col gap-1 cursor-pointer bg-slate-700 px-2 py-1 rounded-md bg-opacity-55 transition-all duration-300 hover:text-slate-50 hover:bg-opacity-100`}
			href={link.url}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="flex items-center gap-2">
				{link.icon}
				<span className={`${isHovered ? link.color : "text-slate-300"}`}>
					{link.title}
				</span>
			</div>
			<span className="text-left text-sm  text-slate-400 font-light">
				{link.desc}
			</span>
		</a>
	);
};

const ResourceNav = ({ handleNav }) => {
	const [isRHovered, setIsRHovered] = useState(false);

	return (
		<div
			className="flex flex-col gap-2"
			onMouseEnter={() => setIsRHovered(true)}
			onMouseLeave={() => setIsRHovered(false)}
		>
			<NavBtn
				className={`${
					isRHovered ? "text-slate-50" : ""
				} flex items-center justify-between gap-2 cursor-pointer w-44`}
			>
				<div className="flex items-center gap-2">
					<GrResources />
					<span>Dot Resources</span>
				</div>
				{isRHovered ? <MdArrowDownward /> : <IoIosArrowDown />}
			</NavBtn>
			{isRHovered && (
				<div className="flex flex-col gap-3 p-3 bg-slate-800 bg-opacity-70 border-[1px] border-slate-700 rounded-md">
					{[
						{
							title: "Ui-component resources",
							desc: "Access shared block of codes of components made of html, css, js, typescript, ... and more languages",
							icon: <CgUiKit />,
							url: "",
							color: "text-color-3",
						},
						{
							title: "Code snippet resources",
							desc: "Access efficient, wide-scoped, reusable and timely code snippets with multi languages including Nodejs, java, C#, C, C++, Swift, Dart, ... and more",
							icon: <VscCode />,
							url: "",
							color: "text-color-1",
						},
						{
							title: "Check community",
							desc: "Visit DotCode community for more resource such as code attached projects (of snippets and components), posts, Q&As, ...",
							icon: <TbWorldCode />,
							url: "/community",
							color: "text-color-8",
						},
					].map((link, index) => (
						<ResourceLink key={index} handleNav={handleNav} link={link} />
					))}
				</div>
			)}
		</div>
	);
};

const features = featuresContent;

const FeatureLink = ({ link, setIsOpened }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<a
			href={`#${link.id}`}
			className={`text-slate-300 font-semibold flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md bg-opacity-55 transition-all duration-300 hover:text-slate-50 hover:bg-opacity-100 ${
				isHovered ? link.btnClass : "bg-slate-700"
			}`}
			onClick={() => setIsOpened(false)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{link.icon}
			<span className="">{link.title}</span>
		</a>
	);
};
const FeaturesNav = ({ setIsOpened }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="flex flex-col gap-2"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<NavBtn
				className={`${
					isHovered ? "text-slate-50" : ""
				} flex items-center justify-between gap-2 cursor-pointer w-44`}
			>
				<div className="flex items-center gap-2">
					<img src="/dot.svg" width={17} className="grayscale" />
					<span>Dot Features</span>
				</div>
				{isHovered ? <MdArrowDownward /> : <IoIosArrowDown />}
			</NavBtn>
			{isHovered && (
				<div className="flex flex-col gap-3 p-3 bg-slate-800 bg-opacity-70 border-[1px] border-slate-700 rounded-md">
					{features.map((link, index) => (
						<FeatureLink
							link={link}
							key={index}
							setIsHovered={setIsHovered}
							setIsOpened={setIsOpened}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const DevelopersNav = ({ handleNav }) => {
	const [isRHovered, setIsRHovered] = useState(false);

	return (
		<div
			className="flex flex-col gap-2"
			onMouseEnter={() => setIsRHovered(true)}
			onMouseLeave={() => setIsRHovered(false)}
		>
			<NavBtn
				className={`${
					isRHovered ? "text-slate-50" : ""
				} flex items-center justify-between gap-2 cursor-pointer w-44`}
			>
				<div className="flex items-center gap-2">
					<TbUserCode />
					<span>For Developers</span>
				</div>
				{isRHovered ? <MdArrowDownward /> : <IoIosArrowDown />}
			</NavBtn>
			{isRHovered && (
				<div className="flex flex-col gap-3 p-3 bg-slate-800 bg-opacity-70 border-[1px] border-slate-700 rounded-md">
					{[
						{
							title: "Front-End Source Code",
							desc: "Access a front end source code of this whole website, which is developed with React and different package, for free",
							icon: <FaReact />,
							url: "https://github.com/sgc93/dotcode",
							color: "text-color-6",
						},
						{
							title: "Back-End Source Code",
							desc: "Check an api source code of this website made of Nodejs",
							icon: <FaNode />,
							url: "https://github.com/sgc93/dotcode-api",
							color: "text-color-1",
						},
						{
							title: "DotCode API Documentation",
							desc: "See through dot's api documentation for your desired application",
							icon: <TbApi />,
							url: "https://documenter.getpostman.com/view/38037883/2sAY4rG5vR",
							color: "text-color-2",
						},
					].map((link, index) => (
						<ResourceLink key={index} link={link} handleNav={handleNav} />
					))}
				</div>
			)}
		</div>
	);
};

const NavLinkList = ({ setIsOpened, isHome }) => {
	const navigateTo = useNavigate();
	const { pathname } = useLocation();

	const showHomeNav =
		pathname.includes("/community") || pathname.includes("/profile");
	const showCommNav = pathname === "/" || pathname.includes("/profile");

	const handleNavigate = (link) => {
		setIsOpened(false);
		navigateTo(link);
	};

	return (
		<nav className="flex flex-col items-start gap-3 pl-7 pr-5 py-2">
			{showHomeNav && (
				<NavBtn
					href={""}
					onClick={() => navigateTo("/")}
					className={"flex items-center gap-2"}
				>
					<CgHome />
					Home
				</NavBtn>
			)}
			{showCommNav && (
				<NavBtn
					href={""}
					onClick={() => navigateTo("/community")}
					className={"flex items-center gap-2"}
				>
					<TbWorldCode />
					Community
				</NavBtn>
			)}
			<NavBtn
				className={"flex items-center gap-2 cursor-pointer"}
				onClick={() => handleNavigate("/editor/dotcode")}
			>
				<BiCodeBlock />
				<span>Editor</span>
			</NavBtn>
			{isHome && <FeaturesNav setIsOpened={setIsOpened} />}
			<ResourceNav handleNav={handleNavigate} />
			<DevelopersNav handleNav={handleNavigate} />
		</nav>
	);
};

const SideNav = ({ isHome }) => {
	const [isOpened, setIsOpened] = useState(false);

	const handleNav = () => setIsOpened((isOpened) => !isOpened);

	return (
		<div className="md:hidden">
			{!isOpened ? (
				<Button
					onClick={() => handleNav()}
					className={"text-n-2 hover:text-n-1 transition-all duration-300 pt-1"}
				>
					<BiDotsVerticalRounded size={23} />
				</Button>
			) : (
				<div className=" w-[100dvw] h-[100vh] absolute right-0 top-0 flex flex-col items-end md:gap-2 gap-1 z-50 bg-n-12 backdrop-blur-md">
					<Grid />
					<div className="w-[90dvw] h-[94dvh] bg-n-13 border-2 border-n-6 rounded-lg m-4 overflow-hidden shadow-lg shadow-n-11 flex flex-col justify-between gap-4 bg-[url('assets/spotlight_right.svg')] bg-top bg-cover">
						<div className="flex flex-col gap-4">
							<SideNavHeader handleNav={handleNav} isHome={isHome} />
							<NavLinkList setIsOpened={setIsOpened} isHome={isHome} />
						</div>
						<div className=" mx-5 -mb-24 p-4 border-t-2 border-n-11 flex items-center justify-center">
							<img src="./dot.svg" alt="" className="opacity-50 w-44" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SideNav;
