import { useState } from "react";
import { FaHtml5 } from "react-icons/fa";
import { ImShare } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowForward } from "react-icons/md";
import { PiCodeBold } from "react-icons/pi";
import { SiReact } from "react-icons/si";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LngTab from "../../../../ui/LngTab";
import { supportedLng } from "../../../../utils/supportedLng";
import {
	handleCreatingModal,
	resetCreatingModal,
	setNewProject,
} from "../../../editor/editorSlice";

const languages = supportedLng.reverse();

const CreateModal = ({ exitSelecting, setIsPosting }) => {
	const [isHovered, setIsHovered] = useState(false);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const handleClick = (type, lngName) => {
		dispatch(resetCreatingModal());
		dispatch(setNewProject({ type, lngName }));
		dispatch(handleCreatingModal(true));
		navigateTo("/editor/code");

		exitSelecting();
	};

	const startPosting = (type, lng) => {
		setIsPosting(true);
		exitSelecting();
	};

	return (
		<div className="move-from-top absolute left-0 top-8 z-[100] bg-slate-800 rounded-lg border-2 border-slate-700 w-72 pb-1 shadow-lg shadow-n-7">
			<div
				className="flex gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
				onClick={() => handleClick("ui", "")}
			>
				<div className="text-slate-300">
					<FaHtml5 size={13} />
				</div>
				<div className="flex flex-col gap-1 -mt-[5px]">
					<span className="text-slate-300">New Ui-component</span>
					<span className="text-slate-400 text-sm">
						With{" "}
						<span className="text-red-500 font-semibold font-sans">HTML</span>,{" "}
						<span
							className="text-cyan-500 font-semibold font-sans
								"
						>
							CSS
						</span>{" "}
						and{" "}
						<span
							className="text-yellow-500 font-semibold font-sans uppercase
								"
						>
							Javascript
						</span>{" "}
						with integrated output displayer terminal
					</span>
				</div>
			</div>
			<div
				className="flex gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
				onClick={() => handleClick("snippet", "react")}
			>
				<div className="text-slate-300">
					<SiReact size={13} />
				</div>
				<div className="flex flex-col gap-1 -mt-[5px]">
					<span className="text-slate-300">New Ui-component</span>
					<span className="text-slate-400 text-sm">
						With{" "}
						<span
							className="text-cyan-500 font-semibold font-sans
								"
						>
							React
						</span>{" "}
						and{" "}
						<span
							className="text-green-400 font-semibold font-sans
								"
						>
							tailwindcss
						</span>{" "}
						with integrated output displayer terminal.
					</span>
				</div>
			</div>
			<div
				className="flex items-start gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="text-slate-300">
					<PiCodeBold />
				</div>
				<div className="relative w-full flex flex-col gap-1  -mt-[4px]">
					<span className="text-slate-300">New Code Snippet</span>
					<div className="w-full flex items-center justify-between text-slate-400 pt-1">
						<span className="-mt-1 text-sm">Select supported languages</span>
						{isHovered ? <MdArrowForward /> : <IoIosArrowForward />}
					</div>
					{isHovered && (
						<div className="flex flex-col gap-[2px] absolute z-[100] -right-1 top-6 xs:top-0 xs:left-[70%] sm:left-[103%] bg-slate-800 shadow-md shadow-n-13 rounded-md py-2 min-w-44">
							{languages.map((lng, index) => (
								<LngTab lng={lng} key={index} handleClick={handleClick} />
							))}
						</div>
					)}
				</div>
			</div>
			<div
				className="flex gap-2 transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-20 cursor-pointer p-2 mt-1"
				onClick={() => startPosting()}
			>
				<div className="text-slate-300">
					<ImShare size={13} />
				</div>
				<div className="flex flex-col gap-1 -mt-[5px]">
					<span className="text-slate-300">Post</span>
					<span className="text-slate-400 text-sm">
						Share{" "}
						<span className="text-purple-500 font-bold font-sans">
							your point of view
						</span>
						,{" "}
						<span
							className="text-pink-500 font-semibold font-sans
								"
						>
							Questions or Explanations
						</span>{" "}
						and{" "}
						<span
							className="text-blue-500 font-semibold font-sans
								"
						>
							even blogs
						</span>{" "}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CreateModal;
