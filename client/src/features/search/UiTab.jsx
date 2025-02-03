import { useState } from "react";
import { BiCheck } from "react-icons/bi";

const UiTab = ({ tag, handleTagging }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`flex justify-between gap-1 bg-slate-950  rounded-lg px-3 py-2 transition-all duration-500 hover:bg-opacity-90 cursor-pointer overflow-hidden text-sm border-[1px] hover:border-color-5 hover:border-opacity-70 ${
				tag === "ui"
					? "bg-opacity-90 border-color-5 border-opacity-70"
					: "bg-opacity-70 border-slate-600 border-opacity-100"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => handleTagging("ui")}
		>
			<div className="flex flex-col gap-1">
				<span
					className={`${
						isHovered || tag === "ui" ? "text-color-5" : "text-slate-300"
					} transition-all duration-300 font-bold`}
				>
					Ui Components
				</span>{" "}
				<span className="text-slate-500 hidden sm:inline">
					Ready to use ui-components built{" "}
					<span
						className={`${
							isHovered || tag === "ui" ? "text-red-500" : "text-slate-400"
						} transition-all duration-300 `}
					>
						HTML
					</span>
					,{" "}
					<span
						className={`${
							isHovered || tag === "ui" ? "text-cyan-500" : "text-slate-400"
						} transition-all duration-300`}
					>
						CSS
					</span>{" "}
					and{" "}
					<span
						className={`${
							isHovered || tag === "ui" ? "text-orange-500" : "text-slate-400"
						} transition-all duration-300`}
					>
						JavaScript
					</span>{" "}
				</span>
			</div>
			<div
				className={`text-color-5 ${tag == "ui" ? "opacity-100" : "opacity-0"}`}
			>
				<BiCheck size={22} />
			</div>
		</div>
	);
};

export default UiTab;
