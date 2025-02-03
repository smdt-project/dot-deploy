import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
	const [isHovered, setIsHovered] = useState(false);
	const navigateTo = useNavigate();

	return (
		<button
			className="flex items-center gap-1 text-n-3 bg-slate-700 bg-opacity-60 pr-2 rounded-md transition-all duration-300 hover:bg-opacity-100 hover:text-slate-200"
			onClick={() => navigateTo(-1)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isHovered ? <BiArrowBack /> : <IoIosArrowBack />}
			back
		</button>
	);
};

export default BackBtn;
