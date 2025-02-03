import { useState } from "react";
import { BiCheck } from "react-icons/bi";

const UserTab = ({ tag, handleTagging }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`w-full flex justify-between gap-1 bg-slate-950  rounded-lg px-3 py-2 transition-all duration-500 hover:bg-opacity-90 cursor-pointer overflow-hidden text-sm border-[1px] hover:border-color-5 hover:border-opacity-70 ${
				tag === "user"
					? "bg-opacity-90 border-color-5 border-opacity-70"
					: "bg-opacity-70 border-slate-600 border-opacity-100"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => handleTagging("user")}
		>
			<div className="flex flex-col gap-1 w-full">
				<span
					className={`${
						isHovered || tag === "user" ? "text-color-5" : "text-slate-300"
					} transition-all duration-300 font-bold w-full`}
				>
					Users
				</span>
				<span className="text-slate-500 hidden sm:inline">
					Search and visit{" "}
					<span
						className={`${
							isHovered || tag === "user" ? "text-color-4" : ""
						} transition-all duration-300 font-semibold`}
					>
						DotCode Users
					</span>{" "}
					, collaborate and have inspirational works.
				</span>
			</div>
			{tag === "user" && <BiCheck size={22} className="text-color-5" />}
		</div>
	);
};

export default UserTab;
