import { useState } from "react";
import { BiCheck } from "react-icons/bi";

const ProjectTab = ({ tag, handleTagging }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`flex justify-between gap-1 bg-slate-950  rounded-lg px-3 py-2 transition-all duration-500 hover:bg-opacity-90 cursor-pointer overflow-hidden text-sm border-[1px] hover:border-color-5 hover:border-opacity-70 sm:w-1/3 ${
				tag === "project"
					? "bg-opacity-90 border-color-5 border-opacity-70"
					: "bg-opacity-70 border-slate-600 border-opacity-100"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => handleTagging("project")}
		>
			<div className="flex flex-col gap-1">
				<span
					className={`${
						isHovered || tag === "project" ? "text-color-5" : "text-slate-300"
					} transition-all duration-300 font-bold `}
				>
					Projects
				</span>
				<span className="text-slate-500 hidden sm:inline">
					Either{" "}
					<span
						className={`${
							isHovered || tag === "project" ? "text-color-3" : ""
						} transition-all duration-300 font-semibold `}
					>
						code snippets
					</span>{" "}
					with html, css and js or{" "}
					<span
						className={`${
							isHovered || tag === "project" ? "text-color-2" : ""
						} transition-all duration-300 font-semibold `}
					>
						ui components
					</span>{" "}
					written with different languages.
				</span>
			</div>
			<div
				className={`text-color-5 ${
					tag == "project" ? "opacity-100" : "opacity-0"
				}`}
			>
				<BiCheck size={22} />
			</div>
		</div>
	);
};

export default ProjectTab;
