import { useState } from "react";
import { BiCheck } from "react-icons/bi";

const PostTab = ({ tag, handleTagging }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`flex justify-between gap-1 bg-slate-950  rounded-lg px-3 py-2 transition-all duration-500 hover:bg-opacity-90 cursor-pointer overflow-hidden text-sm border-[1px] hover:border-color-5 hover:border-opacity-70 ${
				tag === "post"
					? "bg-opacity-90 border-color-5 border-opacity-70"
					: "bg-opacity-70 border-slate-600 border-opacity-100"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => handleTagging("post")}
		>
			<div className="flex flex-col gap-1">
				<span
					className={`${
						isHovered || tag === "post" ? "text-color-5" : "text-slate-300"
					} transition-all duration-300 font-bold `}
				>
					Posts
				</span>
				<span className="text-slate-500 hidden sm:inline">
					Read posts including{" "}
					<span
						className={`${
							isHovered || tag === "post" ? "text-purple-500" : ""
						} transition-all duration-300 font-semibold`}
					>
						Blogs
					</span>
					,{" "}
					<span
						className={`${
							isHovered || tag === "post" ? "text-yellow-500" : ""
						} transition-all duration-300 font-semibold`}
					>
						Explanations
					</span>
					,{" "}
					<span
						className={`${
							isHovered || tag === "post" ? "text-blue-500" : ""
						} transition-all duration-300 font-semibold`}
					>
						Q&As
					</span>{" "}
					and more posts as a resource.
				</span>
			</div>
			<div
				className={`text-color-5 ${
					tag == "post" ? "opacity-100" : "opacity-0"
				}`}
			>
				<BiCheck size={22} />
			</div>
		</div>
	);
};

export default PostTab;
