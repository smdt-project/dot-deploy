import { useEffect, useState } from "react";
import { BiCloudUpload, BiTerminal } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { GoTab } from "react-icons/go";
import { ImListNumbered } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import { LuFoldVertical } from "react-icons/lu";
import { MdSplitscreen } from "react-icons/md";
import { PiBracketsCurly, PiPlaceholderBold } from "react-icons/pi";
import { RiFontSize } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { handleTerminal, updateSplit } from "../../editorSlice";
import {
	setAutoSave,
	setCloseBrackets,
	setFoldGutter,
	setLineNo,
	setNotifyInterval,
	setPlaceholder,
	updateCodeFontSize,
	updateCodeTabSize,
} from "./settingSlice";

const classes =
	"transition-all duration-350 hover:bg-slate-400 hover:bg-opacity-30 hover:text-slate-400 cursor-pointer";

const Settings = () => {
	const { codeFontSize, codeTabSize, closeBrackets, lineNo, holder, foldGut } =
		useSelector((state) => state.setting);
	const { showTerminal, splitDxr } = useSelector((state) => state.editor);
	const { project } = useSelector((state) => state.project);
	const { autoSave, notifyInterval } = useSelector((state) => state.setting);
	const isSnippet = project.type === "snippet";

	const [interval, setInterval] = useState(notifyInterval);
	const [fontSize, setFontSize] = useState(codeFontSize);
	const [tabSize, setTabSize] = useState(codeTabSize);
	const [editorPlaceHolder, setEditorPlaceHolder] = useState(holder);

	const [isG1Collapsed, setIsG1Collapsed] = useState(false);
	const [isG2Collapsed, setIsG2Collapsed] = useState(false);
	const [isG3Collapsed, setIsG3Collapsed] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateCodeFontSize(fontSize > 7 ? fontSize : 7));
	}, [fontSize, dispatch]);

	useEffect(() => {
		dispatch(setNotifyInterval(interval > 5 ? interval : 5));
	}, [interval, dispatch]);

	useEffect(() => {
		dispatch(updateCodeTabSize(tabSize > 1 ? tabSize : 1));
	}, [tabSize, dispatch]);

	useEffect(() => {
		dispatch(setPlaceholder(editorPlaceHolder));
	}, [editorPlaceHolder, dispatch]);

	const onTerminal = () => {
		dispatch(handleTerminal(!showTerminal));
	};

	const onSplit = (dxr) => {
		if (showTerminal) {
			dispatch(updateSplit(dxr));
		}
	};

	const onAutoSave = () => {
		dispatch(setAutoSave());
	};

	return (
		<div className="flex flex-col gap-1 py-2 text-slate-500">
			<div className="flex flex-col">
				<div
					className={`flex items-center gap-1 px-1 ${classes}`}
					onClick={() => setIsG3Collapsed((iscollapsed) => !iscollapsed)}
				>
					<div
						className={`transition-all duration-300 ${
							isG3Collapsed ? "rotate-0" : "rotate-90"
						}`}
					>
						<IoIosArrowForward />
					</div>
					<span className=" line-clamp-1 uppercase text-[12px] ">Save</span>
				</div>
				{!isG3Collapsed && (
					<div className="flex flex-col gap-1">
						<div className="flex items-start justify-between gap-1 pl-6 bg-slate-400 bg-opacity-20 text-slate-400 py-1">
							<div className=" text-color-5">
								<BiCloudUpload size={17} />
							</div>
							<div className="flex flex-col gap-2 -mt-3">
								<div className="flex items-center justify-between gap-1">
									<span className="text-sm line-clamp-1">Auto Save </span>
									<div
										className="text-2xl cursor-pointer pr-2 py-2"
										onClick={() => onAutoSave()}
									>
										{autoSave ? (
											<FaToggleOn className="text-slate-300" />
										) : (
											<FaToggleOff
												className={`text-slate-400 transition-all duration-300 hover:text-slate-300`}
											/>
										)}
									</div>
								</div>
								<div className="flex items-end justify-between gap-3">
									<span className="text-slate-400 pr-2 line-clamp-3">
										<span className="text-color-5">Dotcode</span> will
										automatically save you changes if there is any in :
									</span>
									<input
										type="number"
										className="input-number flex w-12 pl-2 text-slate-300 bg-slate-400 bg-opacity-20 rounded-l-md border-none outline-none"
										value={interval}
										step={0}
										onChange={(e) =>
											setInterval(e.target.value > 0 ? e.target.value : 0)
										}
									/>
									<span> secs</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="flex flex-col">
				<div
					className={`flex items-center gap-1 px-1 ${classes}`}
					onClick={() => setIsG1Collapsed((iscollapsed) => !iscollapsed)}
				>
					<div
						className={`transition-all duration-300 ${
							isG1Collapsed ? "rotate-0" : "rotate-90"
						}`}
					>
						<IoIosArrowForward />
					</div>
					<span className=" line-clamp-1 uppercase text-[12px] ">
						Code Editor
					</span>
				</div>
				{!isG1Collapsed && (
					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between gap-1 pl-6 bg-slate-400 bg-opacity-20 text-slate-400">
							<div className="flex items-center gap-1">
								<div className=" text-color-4">
									<RiFontSize />
								</div>
								<span className="text-sm line-clamp-1">Code font size</span>
							</div>
							<input
								type="number"
								className="input-number flex w-12 pl-2 text-slate-300 bg-slate-400 bg-opacity-20 rounded-l-md border-none outline-none"
								value={fontSize}
								step={0}
								onChange={(e) =>
									setFontSize(e.target.value > 0 ? e.target.value : 0)
								}
							/>
						</div>
						<div className="flex items-center justify-between gap-1 pl-6  bg-slate-400 bg-opacity-20 text-slate-400">
							<div className="flex items-center gap-1">
								<div className=" text-color-3">
									<GoTab />
								</div>
								<span className="text-sm line-clamp-1">
									Indent unit & tab size
								</span>
							</div>
							<input
								type="number"
								className="input-number flex w-12 pl-2 text-slate-300 bg-slate-400 bg-opacity-20 rounded-l-md border-none outline-none"
								value={codeTabSize}
								step={0}
								onChange={(e) =>
									setTabSize(e.target.value > 0 ? e.target.value : 1)
								}
							/>
						</div>
						<div className="flex items-center justify-between gap-1 pl-6  bg-slate-400 bg-opacity-20 text-slate-400">
							<div className="flex items-center gap-1">
								<div className=" text-color-6">
									<PiPlaceholderBold />
								</div>
								<span className="text-sm line-clamp-1">
									Placeholder (editor){" "}
								</span>
							</div>
							<input
								type="text"
								className="flex pl-2 text-slate-300 bg-slate-400 bg-opacity-20 rounded-l-md border-none outline-none"
								value={editorPlaceHolder}
								onChange={(e) => setEditorPlaceHolder(e.target.value)}
							/>
						</div>

						<div className="flex items-center justify-between gap-1 pl-6  bg-slate-400 bg-opacity-20 text-slate-400">
							<div className="flex items-center gap-1">
								<div className=" text-color-2">
									<PiBracketsCurly />
								</div>
								<span className="text-sm line-clamp-1">Close brackets</span>
							</div>
							<div
								className="text-2xl cursor-pointer pr-2"
								onClick={() => dispatch(setCloseBrackets())}
							>
								{closeBrackets ? (
									<FaToggleOn className="text-slate-300" />
								) : (
									<FaToggleOff
										className={`text-slate-400 transition-all duration-300 hover:text-slate-300`}
									/>
								)}
							</div>
						</div>
						<div className="flex items-center justify-between gap-1 pl-6  bg-slate-400 bg-opacity-20 text-slate-400">
							<div className="flex items-center gap-1">
								<div className=" text-color-8">
									<LuFoldVertical />
								</div>
								<span className="text-sm line-clamp-1">Fold gutters</span>
							</div>
							<div
								className="text-2xl cursor-pointer pr-2"
								onClick={() => dispatch(setFoldGutter())}
							>
								{foldGut ? (
									<FaToggleOn className="text-slate-300" />
								) : (
									<FaToggleOff
										className={`text-slate-400 transition-all duration-300 hover:text-slate-300`}
									/>
								)}
							</div>
						</div>
						<div className="flex items-center justify-between gap-1 pl-6  bg-slate-400 bg-opacity-20 text-slate-400">
							<div className="flex items-center gap-1">
								<div className=" text-color-1">
									<ImListNumbered size={15} />
								</div>
								<span className="text-sm line-clamp-1">Line numbers</span>
							</div>
							<div
								className="text-2xl cursor-pointer pr-2"
								onClick={() => dispatch(setLineNo())}
							>
								{lineNo ? (
									<FaToggleOn className="text-slate-300" />
								) : (
									<FaToggleOff
										className={`text-slate-400 transition-all duration-300 hover:text-slate-300`}
									/>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="flex flex-col">
				<div
					className={`flex items-center gap-1 px-1 ${classes}`}
					onClick={() => setIsG2Collapsed((iscollapsed) => !iscollapsed)}
				>
					<div
						className={`transition-all duration-300 ${
							isG2Collapsed ? "rotate-0" : "rotate-90"
						}`}
					>
						<IoIosArrowForward />
					</div>
					<span className=" line-clamp-1 uppercase text-[12px] ">
						Editor components
					</span>
				</div>
				{!isG2Collapsed && (
					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between gap-1 pl-6  bg-slate-400 bg-opacity-20 text-slate-400">
							<div className="flex items-center gap-1">
								<div className=" text-color-4">
									<BiTerminal />
								</div>
								<span className="text-sm line-clamp-1">
									Show output terminal
								</span>
							</div>
							<div
								className="text-2xl cursor-pointer pr-2 py-2"
								onClick={() => onTerminal()}
							>
								{showTerminal ? (
									<FaToggleOn className="text-slate-300" />
								) : (
									<FaToggleOff
										className={`text-slate-400 transition-all duration-300 ${
											!isSnippet && "hover:text-slate-300"
										}`}
									/>
								)}
							</div>
						</div>
						<div className="flex items-center justify-between gap-1 pl-6  bg-slate-400 bg-opacity-20 text-slate-400">
							<div className="flex items-center gap-1">
								<div className=" text-color-3">
									<MdSplitscreen className="rotate-90" />
								</div>
								<span className="text-sm line-clamp-1">Split direction</span>
							</div>
							<div
								className={`flex items-start pr-1 py-2 ${
									showTerminal ? "opacity-100" : "opacity-30"
								}`}
							>
								<button
									className={`flex items-center justify-center ${
										splitDxr === "horizontal" && "bg-slate-500 bg-opacity-80"
									} transition-all duration-300 hover:bg-slate-500 hover:bg-opacity-80 px-[4px] py-[5px] rounded-sm`}
									onClick={() => onSplit("horizontal")}
								>
									<img src="/assets/ui_y.png" alt="" width={15} />
								</button>
								<button
									className={`flex items-center justify-center ${
										splitDxr === "vertical" && "bg-slate-500 bg-opacity-80"
									} transition-all duration-300 hover:bg-slate-500 hover:bg-opacity-80 p-[4px] px-[4px] py-[5px] rounded-sm`}
									onClick={() => onSplit("vertical")}
								>
									<img src="/assets/ui_x.png" alt="" width={15} />
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Settings;
