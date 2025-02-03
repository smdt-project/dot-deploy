import { TbTriangleFilled } from "react-icons/tb";

const TooltipUp = ({ content }) => {
	return (
		<div className="absolute top-[2rem] left-1/2 -translate-x-1/2 w-max z-[101] bg-[#353b47] border-[1px] border-[#4f586a] shadow-lg shadow-slate-800 px-2 py-[1px] rounded-sm">
			<span className="capitalize font-sans text-sm text-slate-300">
				{content}
			</span>
		</div>
	);
};
const TooltipDown = ({ content }) => {
	return (
		<div className="absolute top-[2rem] right-0 w-max z-[101] bg-[#353b47] border-[1px] border-[#4f586a] shadow-lg shadow-slate-800 px-2 py-[1px] rounded-sm">
			<span className="capitalize font-sans text-sm text-slate-300">
				{content}
			</span>
		</div>
	);
};

const TooltipLeft = ({ content }) => {
	return (
		<div className="absolute left-[3.2rem] z-[101] bg-[#353b47] border-[1px] border-[#4f586a] shadow-lg shadow-slate-700 text-[16px] font-sans px-2 rounded-sm">
			<div className=" absolute top-2 -left-[0.8rem] -rotate-90 text-[#353b47] -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span className=" capitalize">{content}</span>
		</div>
	);
};

const TooltipRight = ({ content }) => {
	return (
		<div className="absolute left-[3.2rem] z-[101] bg-[#353b47] border-[1px] border-[#4f586a] shadow-lg shadow-slate-700 text-[16px] font-sans px-2 rounded-sm">
			<div className=" absolute top-2 -right-[0.8rem] rotate-90 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span className=" capitalize">{content}</span>
		</div>
	);
};

const EditorToolTip = ({ dxr, content }) => {
	if (dxr === "left") {
		return <TooltipLeft content={content} />;
	} else if (dxr === "right") {
		return <TooltipRight />;
	} else if (dxr === "up") {
		return <TooltipUp content={content} />;
	} else if (dxr === "down") {
		return <TooltipDown content={content} />;
	}
};

export default EditorToolTip;
