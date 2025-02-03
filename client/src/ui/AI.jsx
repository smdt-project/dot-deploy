import { AiFillAudio } from "react-icons/ai";
import { CgAttachment } from "react-icons/cg";
import { FaCode } from "react-icons/fa6";
import { IoArrowUp } from "react-icons/io5";
import { MdOutlineMarkEmailRead, MdSchool } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";

const AIHeader = () => {
	return (
		<div className="w-full flex items-center justify-between">
			<div className="flex items-center gap-2">
				<RiMenu2Fill
					size={18}
					className="text-slate-400 cursor-pointer hover:text-slate-200"
				/>
				<span className="font-black text-lg bg-gradient-to-tr from-amber-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
					SeekMore
				</span>
			</div>
			<div className="bg-amber-600 w-8 h-8 flex items-center justify-center rounded-full bg-opacity-70 border-2 border-amber-500">
				Ab
			</div>
		</div>
	);
};

const qq = [
	{
		q: "Quize me on Ethiopian history",
		icon: <MdSchool className="text-blue-500" />,
	},
	{
		icon: <FaCode className="text-purple-400" />,
		q: "python script to send email from console",
	},
	{
		icon: <MdOutlineMarkEmailRead className="text-amber-500" />,
		q: "Generate concise formal email",
	},
];

const Question = ({ q }) => {
	return (
		<div className="flex flex-col gap-2 bg-slate-700 border-2 border-slate-700 bg-opacity-50 p-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 cursor-pointer">
			{q.icon}
			<span className="text-slate-400 text-sm">{q.q}</span>
		</div>
	);
};

const QuickQ = () => {
	return (
		<div className="flex items-center gap-5 my-10 px-3">
			{qq.map((q, i) => (
				<Question q={q} key={i} />
			))}
		</div>
	);
};

const InputBox = () => {
	return (
		<div className="w-full bg-slate-700 border-2 border-slate-600 rounded-full mt-10 flex items-center justify-between p-2">
			<div className=" w-5/6 flex items-center gap-3">
				<CgAttachment className="cursor-pointer text-slate-300" />
				<AiFillAudio className="cursor-pointer text-slate-300" />
				<input
					type="text"
					placeholder="Ask anything..."
					className="bg-transparent border-none outline-none placeholder:text-slate-400 placeholder:text-opacity-70 placeholder:font-semibold text-slate-200 font-semibold w-11/12"
				/>
			</div>
			<button className="text-slate-400 bg-slate-800 p-[4px] rounded-full transition-all duration-300 hover:bg-slate-950 hover:text-slate-100">
				<IoArrowUp />
			</button>
		</div>
	);
};

const AI = () => {
	return (
		<div className=" w-[90dvw] sm:w-[80dvw] md:w-[40vw] h-fit bg-slate-800 p-5 rounded-lg flex flex-col gap-2 items-center -translate-y-[4rem] md:translate-y-0 self-center">
			<AIHeader />
			<QuickQ />
			<InputBox />
		</div>
	);
};

export default AI;
