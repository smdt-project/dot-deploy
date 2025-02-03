import { useState } from "react";
import { BiCheck } from "react-icons/bi";

const SnippetTab = ({ tag, handleTagging }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`flex justify-between gap-1 bg-slate-950  rounded-lg px-3 py-2 transition-all duration-500 hover:bg-opacity-90 cursor-pointer overflow-hidden text-sm border-[1px] hover:border-color-5 hover:border-opacity-70 ${
				tag === "snippet"
					? "bg-opacity-90 border-color-5 border-opacity-70"
					: "bg-opacity-70 border-slate-600 border-opacity-100"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => handleTagging("snippet")}
		>
			<div className="flex flex-col gap-1">
				<span
					className={`${
						isHovered || tag === "snippet" ? "text-color-5" : "text-slate-300"
					} transition-all duration-300 font-bold `}
				>
					Code Snippets
				</span>
				<span className="text-slate-500 hidden sm:inline">
					Snippets written with different languages{" "}
					<span
						className={`${
							isHovered || tag === "snippet" ? "text-color-3" : ""
						} transition-all duration-300 font-semibold `}
					>
						Languages
					</span>{" "}
					and frameworks.
				</span>
			</div>
			<div
				className={`text-color-5 ${
					tag == "snippet" ? "opacity-100" : "opacity-0"
				}`}
			>
				<BiCheck size={22} />
			</div>
		</div>
	);
};

export default SnippetTab;
