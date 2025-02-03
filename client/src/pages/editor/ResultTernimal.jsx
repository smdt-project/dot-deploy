import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import EditorToolTip from "../../ui/EditorToolTip";
import Terminal from "./Ternimal";
import { handleTerminal, resetLogs, setOutputTerminal } from "./editorSlice";

const ResultTerminal = ({ srcDoc, resizeTerminal }) => {
	const { project } = useSelector((state) => state.project);
	const { logs, isOutput } = useSelector((state) => state.editor);
	const dispatch = useDispatch();
	const projectName = project.name;
	const hasOutput = project.type === "ui" || project.lngName === "react";

	const [isResizedFull, setIsResizedFull] = useState(false);
	const [isSizerHovered, setIsSizerHovered] = useState(false);
	const [isCloserHovered, setIsCloserHovered] = useState(false);
	const [isResultHovered, setIsResultHovered] = useState(false);
	const [isTerminalHovered, setIsTerminalHovered] = useState(false);
	const [isClearHovered, setIsClearHovered] = useState(false);

	const handleResizing = () => {
		setIsSizerHovered(false);
		isResizedFull ? resizeTerminal([70, 30]) : resizeTerminal([0, 100]);
		setIsResizedFull((isIt) => !isIt);
	};

	const clearLogs = () => dispatch(resetLogs());

	const onTerminal = () => {
		dispatch(handleTerminal(false));
	};

	const updateOutput = (show) => dispatch(setOutputTerminal(show));

	return (
		<div className="w-full h-full bg-[#22252dca] flex flex-col">
			<div className=" bg-[#353a47]  p-2 flex items-center justify-between shadow-sm shadow-n-14">
				<div className="flex items-center gap-3">
					{hasOutput && (
						<div className="relative flex items-center justify-center">
							<button
								className={`uppercase font-code text-sm transition-all duration-300 hover:text-color-2 border-b-[1px] pb-[2px] ${
									isOutput
										? "border-color-2 text-color-2"
										: "border-transparent text-slate-300"
								}`}
								onClick={() => updateOutput(true)}
								onMouseEnter={() => setIsResultHovered(true)}
								onMouseLeave={() => setIsResultHovered(false)}
							>
								Result
							</button>
							{isResultHovered && (
								<EditorToolTip dxr={"up"} content={"Ui Result"} />
							)}
						</div>
					)}
					<div className="relative flex items-center justify-center">
						<button
							className={`uppercase font-code text-sm transition-all duration-300 hover:text-color-2 border-b-[1px] pb-[2px] ${
								isOutput
									? "border-transparent text-slate-300"
									: "border-color-2 text-color-2"
							}`}
							onClick={() => updateOutput(false)}
							onMouseEnter={() => setIsTerminalHovered(true)}
							onMouseLeave={() => setIsTerminalHovered(false)}
						>
							<span>Terminal</span>
						</button>
						{isTerminalHovered && (
							<EditorToolTip dxr={"up"} content={"Terminal (logs)"} />
						)}
					</div>
					{logs.length > 0 && (
						<span className="h-[17px] flex items-center justify-center -ml-2 -mt-1 text-[9px] bg-color-2 text-slate-900 font-bold font-roboto px-[5px] rounded-full">
							{logs.length}
						</span>
					)}
					{!isOutput && (
						<div className="relative flex items-center justify-center">
							<button
								className="text-sm text-slate-300 transition-all duration-300 hover:text-slate-50 bg-color-3 hover:bg-red-700 bg-opacity-30 px-1 pb-[1px] rounded-sm font-code"
								onClick={() => clearLogs()}
								onMouseEnter={() => setIsClearHovered(true)}
								onMouseLeave={() => setIsClearHovered(false)}
							>
								clear
							</button>
							{isClearHovered && (
								<EditorToolTip dxr={"up"} content={"Clear all logs"} />
							)}
						</div>
					)}
				</div>
				<div className="flex-grow flex items-center justify-end">
					<span className=" text-[15px] font-sans text-slate-400 bg-color-5 bg-opacity-30 rounded-md px-2 line-clamp-1 max-w-[50%]">
						{projectName.split(" ").join("-")}
					</span>
					<div className="relative flex items-center justify-center">
						<button
							className=" text-lg transition-all duration-300 hover:bg-stone-300 rounded-md hover:text-slate-900 mx-2"
							onClick={() => handleResizing()}
							onMouseEnter={() => setIsSizerHovered(true)}
							onMouseLeave={() => setIsSizerHovered(false)}
						>
							{isResizedFull ? <IoIosArrowDown /> : <IoIosArrowUp />}
						</button>
						{isSizerHovered && (
							<EditorToolTip
								dxr={"down"}
								content={
									isResizedFull ? "minimize panel size" : "maximize panel size"
								}
							/>
						)}
					</div>
					<div className="flex items-center justify-center relative">
						<button
							className=" text-lg transition-all duration-300 hover:bg-stone-300 rounded-md hover:text-slate-900"
							onClick={() => onTerminal()}
							onMouseEnter={() => setIsCloserHovered(true)}
							onMouseLeave={() => setIsCloserHovered(false)}
						>
							<MdClose />
						</button>
						{isCloserHovered && (
							<EditorToolTip dxr={"down"} content={"hide panel"} />
						)}
					</div>
				</div>
			</div>
			<Terminal srcDoc={srcDoc} isOutput={isOutput} />
		</div>
	);
};

export default ResultTerminal;
