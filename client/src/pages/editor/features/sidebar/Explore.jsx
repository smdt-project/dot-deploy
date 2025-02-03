import { useState } from "react";
import { FaCss3, FaJs } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { SiHtml5 } from "react-icons/si";
import { useSelector } from "react-redux";
import { useUiUpdate } from "../../../../hooks/useUiUpdate";
import SnippetLngTab from "./SnippetLngTab";

const classes =
	"transition-all duration-300 hover:bg-slate-500 hover:bg-opacity-20 cursor-pointer";

const ExploreTab = ({ tab }) => {
	const handleSelection = useUiUpdate();
	const { currLng } = useSelector((state) => state.project);

	return (
		<button
			className={`flex items-center gap-1 text-sm w-full px-6 ${classes} ${
				currLng === tab.lngName && "bg-slate-500 bg-opacity-20"
			}`}
			onClick={() => handleSelection(tab.lngName)}
		>
			<div>{tab.icon}</div>
			<span className="text-slate-400">{tab.title}</span>
		</button>
	);
};

const Explore = () => {
	const { project } = useSelector((state) => state.project);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const currProjectName = project.name;
	const isSnippet = project.type === "snippet";

	const hideShow = () => setIsCollapsed((isCollapsed) => !isCollapsed);

	return (
		<div className="flex flex-col py-2 text-slate-500">
			<div
				className={`flex items-center gap-1 px-1 ${classes}`}
				onClick={() => hideShow()}
			>
				<div>
					<IoIosArrowForward
						className={`${
							isCollapsed ? "rotate-0" : "rotate-90 "
						} transition-all duration-300`}
					/>
				</div>
				<span className=" line-clamp-1 uppercase text-[12px] ">
					{currProjectName}
				</span>
			</div>
			{!isCollapsed && (
				<div className="flex flex-col">
					{isSnippet ? (
						<SnippetLngTab lngName={project.lngName} />
					) : (
						[
							{
								title: "index.html",
								icon: <SiHtml5 className=" text-red-500" size={12} />,
								lngName: "html",
							},
							{
								title: "script.js",
								icon: <FaJs className=" text-yellow-500" size={12} />,
								lngName: "js",
							},
							{
								title: "style.css",
								icon: <FaCss3 className=" text-cyan-400" size={12} />,
								lngName: "css",
							},
						].map((tab, index) => <ExploreTab tab={tab} key={index} />)
					)}
				</div>
			)}
		</div>
	);
};

export default Explore;
