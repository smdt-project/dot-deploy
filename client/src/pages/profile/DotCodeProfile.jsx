import { useEffect } from "react";
import { BsArrowDown, BsStar, BsStarFill } from "react-icons/bs";
import { GoCodeSquare } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEditorOpen } from "../../hooks/useEditorOpen";
import LngName from "../../ui/LngName";
import UserName from "../../ui/UserName";
import { supportedLng } from "../../utils/supportedLng";
import { isCurrUserLiked } from "../../utils/validators";
import { getDataRequest } from "../community/communitySlice";
import {
	handleCreatingModal,
	resetCreatingModal,
	setNewProject,
} from "../editor/editorSlice";

const languages = supportedLng.reverse();

const TopProject = ({ project }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const isLiked = isUserSignedIn && isCurrUserLiked(project.likes, user.userId);

	const openEditor = useEditorOpen();
	const navigateTo = useNavigate();
	const isSnippet = project.type === "snippet";

	const handleProjectDetailing = () => {
		navigateTo(`/community/project/${project._id}`);
	};
	const goToOwner = () => {
		navigateTo(`/profile/${project.owner._id}`);
	};

	return (
		<div className=" w-full flex flex-col gap-4  bg-slate-700 bg-opacity-60 px-4 py-3 rounded-md border-2 border-slate-700 border-opacity-80 transition-all duration-300 hover:border-color-5 hover:border-opacity-30">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<UserName
						name={project.owner.name}
						avatarUrl={project.owner.avatarUrl}
						projectName={project.name}
						onProject={handleProjectDetailing}
						onOwner={goToOwner}
					/>
					<div className="flex items-center gap-1">
						<span className="text-slate-300 bg-color-3 rounded-r-md px-3 text-sm py-[1px] bg-opacity-50">
							{project.type}
						</span>
					</div>
				</div>
				<span className="text-slate-300 text-sm">{project.description}</span>
			</div>
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center gap-2 text-slate-400 text-sm">
					<LngName isSnippet={isSnippet} name={project.lngName} />
					<button
						className="flex items-center gap-2 font-semibold bg-slate-600 bg-opacity-70 px-2 py-[1px] rounded-md transition-all duration-300 hover:underline hover:underline-offset-2 hover:bg-opacity-70"
						onClick={() => openEditor("open", project.lngName, project)}
					>
						<GoCodeSquare />
						<span className="pb-1">open with editor</span>
					</button>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<div className="flex items-center text-slate-400 border-[1px] border-slate-700  rounded-md bg-slate-800 bg-opacity-80">
						<button
							className={`px-2 py-[3px]  rounded-l-md transition-all duration-300 ${
								isLiked
									? "text-pink-500 bg-slate-700"
									: "hover:bg-slate-700 hover:text-slate-50"
							}`}
							onClick={() => handleProjectDetailing()}
						>
							{isLiked ? <BsStarFill /> : <BsStar />}
						</button>
						<span className="flex-grow px-2 border-l-[1px] border-slate-700 text-center">
							{project.likes.length}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const DotCodeProfile = () => {
	const { topProjects } = useSelector((state) => state.community);
	const openEditor = useEditorOpen();
	const navigateTo = useNavigate();
	const projects = topProjects.length;
	const dispatch = useDispatch();

	useEffect(() => {
		if (projects === 0) {
			dispatch(getDataRequest());
		}
	}, [projects, dispatch]);

	const open = (type, lngName) => {
		dispatch(resetCreatingModal());
		dispatch(setNewProject({ type, lngName }));
		dispatch(handleCreatingModal(true));
		navigateTo("/editor/code");
	};

	return (
		<div className="flex flex-col gap-20 w-full h-full items-center px-10 py-20 bg-n-14 overflow-y-scroll code-area">
			<div className="flex flex-col sm:flex-row gap-10">
				<img src="/dotcode.png" height={160} width={160} />
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-1">
							<span className="font-code font-bold text-2xl text-slate-200">
								DotCode
							</span>
							<span className=" bg-slate-800 px-2 py-[2px] rounded-md bg-opacity-80 text-sm font-code font-semibold">
								v1.0.0
							</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-slate-300">by </span>
							<a
								href="https://github.com/sgc93"
								target="_blank"
								rel="noopener noreferrer"
								className="text-color-5 font-bold font-sans text-opacity-85 hover:text-opacity-100 "
							>
								code enthusiasts
							</a>
						</div>
						<span className="text-slate-300 font-sans">
							Code, store and collaborate effortlessly.
						</span>
					</div>
					<div className="flex flex-col md:flex-row me:items-center gap-1">
						{[
							{
								text: "Start with HTML, CSS and Js",
								child: "",
								href: "#frontEndUi",
							},
							{
								text: "Start with other languages",
								child: <IoIosArrowForward />,
								href: "#selectLanguages",
							},
						].map((btn, index) => (
							<a
								key={index}
								className="bg-[#3b414e] px-2 py-[1px] rounded-sm bg-opacity-60
						text-n-2 font-sans font-semibold transition-all duration-300 border-2 border-n-14 hover:text-white hover:border-slate-600 flex items-center gap-2"
								href={btn.href}
							>
								{btn.text} {btn.child}
							</a>
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-3 s:gap-5 d:gap-8 sd:gap-14">
				<div className="flex flex-col sd:w-[62%] bg-opacity-70 p-6 rounded-lg gap-3">
					<span className="font-bold text-xl sm:text-2xl md:text-3xl font-sans tracking-tight">
						Find inspirations from various{" "}
						<span className=" bg-gradient-to-r from-color-3 via-color-4 to-color-1 bg-clip-text text-transparent uppercase">
							snippets
						</span>{" "}
						and{" "}
						<span className="bg-gradient-to-r from-color-6 via-color-2 to-color-8 bg-clip-text text-transparent uppercase">
							ui-component
						</span>{" "}
						managers
					</span>
					<span className="font-sans text-lg text-slate-300">
						search | check our community | copy paste | update, use and share
					</span>
				</div>
				{topProjects.map((project, i) => (
					<div key={i} className="flex w-full s:w-[48.3%] d:w-[30%] sd:w-[45%]">
						<TopProject project={project} />
					</div>
				))}
				<div className=" flex flex-grow items-center justify-center">
					<button
						className="bg-slate-400 bg-opacity-25 px-4 py-3 rounded-md text-xl font-semibold transition-all duration-300 hover:bg-opacity-50"
						onClick={() => navigateTo("/community")}
					>
						visit community for more
					</button>
				</div>
			</div>
			<div
				id="frontEndUi"
				className="flex flex-col items-start w-full bg-[#353b47] p-12 rounded-lg"
			>
				<h2 className="text-lg sm:text-3xl font-extrabold text-gray-100 mb-4">
					Build Stunning UI Components with HTML, CSS, and JavaScript
				</h2>
				<p className="sm:text-lg text-gray-400 mb-6">
					Craft beautiful, responsive front-end components using HTML5, CSS3,
					and JavaScript. Enjoy a user-friendly, customizable environment that
					allows you to see your code in action as you build.
				</p>
				<button
					className="px-6 py-3 bg-slate-600 bg-opacity-60 text-white sm:text-lg font-semibold rounded-md shadow-sm hover:bg-slate-500 transition ease-in-out duration-300"
					onClick={() => open("ui", "html")}
				>
					Start Now
				</button>
			</div>
			<div className="w-full flex-col gap-8 md:p-6 bg-[#353b47] rounded-xl">
				<div className="flex flex-col items-start p-6 ">
					<h2 className="text-lg sm:text-3xl font-extrabold text-gray-100 mb-4">
						Write code snippets with various languages
					</h2>
					<p className="sm:text-lg text-gray-400 mb-6">
						Write efficient, reusable, and customizable code snippets in a
						variety of languages including Go, Java, Swift, Python, SQL, Vue,
						JavaScript, PHP, and more.
					</p>
					<div className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-slate-100 sm:text-lg font-semibold rounded-md shadow-sm ">
						<span>Select from the list </span>
						<BsArrowDown />
					</div>
				</div>
				<div className="w-full flex gap-2 md:gap-8 p-6">
					<div className="relative w-[100%] md:w-[85%] ">
						<div className="absolute z-20 left-0 top-0 w-5 md:w-20 h-full bg-gradient-to-r from-[#353b47]" />
						<div
							id="selectLanguages"
							className=" flex gap-8 w-full overflow-x-scroll overflow-y-hidden code-area md:small-scroll pb-4"
						>
							{languages.map((lng, index) => (
								<div
									className="min-w-24 sm:min-w-44 md:min-w-64 h-[7rem] sm:h-[14rem] md:h-[17rem] flex flex-col items-center justify-between bg-black bg-opacity-25 rounded-lg px-2 pt-7 pb-3 sm:py-4 cursor-pointer transition-all duration-300 hover:bg-opacity-70"
									key={index}
									onClick={() => open("snippet", lng.lngName)}
								>
									<div className="scale-[3] sm:scale-[7] md:scale-[13] sm:mt-20">
										{lng.icon}
									</div>
									<span
										className={`${lng.color} font-bold sm:text-2xl text-slate-300`}
									>
										{lng.lngName}
									</span>
								</div>
							))}
						</div>
						<div className="absolute z-20 right-0 top-0 w-5 md:w-20 h-full bg-gradient-to-l from-[#353b47]" />
					</div>
					<div className=" min-w-44 h-[17rem] sd:flex flex-col gap-5 bg-black bg-opacity-50 rounded-lg p-4 hidden">
						<span className=" md:text-xl font-bold text-color-5">
							Get Started Quicker
						</span>
						<span className="text-sm md:text-default text-n-2">
							Get inspiration from tones of code managers, wide community and
							pre-defined components and snippets.
						</span>
					</div>
				</div>
			</div>
			<div className="flex mt-10">
				<img
					src="/logo.svg"
					alt=""
					width={100}
					onClick={() => navigateTo("/")}
					className="cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100"
				/>
			</div>
		</div>
	);
};

export default DotCodeProfile;
