import { useState } from "react";
import { GoProject } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowDownward } from "react-icons/md";
import CreateModal from "./features/comSidebar/CreateModal";
import PostModal from "./features/comSidebar/PostModal";

const CreateNewBox = () => {
	const [isSelecting, setIsSelecting] = useState(false);
	const [isPosting, setIsPosting] = useState(false);

	const exitSelecting = () => setIsSelecting(false);

	return (
		<>
			<div
				className="relative flex items-start pb-2"
				onMouseEnter={() => setIsSelecting(true)}
				onMouseLeave={() => setIsSelecting(false)}
			>
				<div
					className={`flex items-center gap-1 font-semibold px-2 py-[1px] rounded-md transition-all duration-300 bg-color-5 ${
						isSelecting
							? "bg-opacity-100 text-white"
							: "hover:bg-opacity-100 hover:text-white text-slate-200 bg-opacity-80"
					}`}
				>
					<GoProject size={12} />
					<span>new</span>
					{isSelecting ? <MdArrowDownward /> : <IoIosArrowDown />}
				</div>
				{isSelecting && (
					<CreateModal
						exitSelecting={exitSelecting}
						setIsPosting={setIsPosting}
					/>
				)}
			</div>
			{isPosting && <PostModal setIsPosting={setIsPosting} />}
		</>
	);
};
export default CreateNewBox;
