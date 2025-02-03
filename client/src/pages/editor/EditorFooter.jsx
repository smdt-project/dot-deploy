import { BiFontSize } from "react-icons/bi";
import { BsCode } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdOutlineKeyboardTab } from "react-icons/md";
import { PiPlaceholder } from "react-icons/pi";
import { VscBellDot } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { resetNotifier, setNotifier } from "../../ui/notifierSlice";

const EditorFooter = () => {
	const { lineNo, foldGut, closeBrackets, holder, codeFontSize, codeTabSize } =
		useSelector((state) => state.setting);
	const { project, currLng } = useSelector((state) => state.project);
	const { logs, editorNotifications } = useSelector((state) => state.editor);
	const allLogs = logs.map((log) => JSON.parse(log));
	const errors = allLogs.filter((log) => log.type === "error");

	const dispatch = useDispatch();

	const showAbout = (content) => {
		dispatch(resetNotifier());
		dispatch(setNotifier(content));
	};

	return (
		<div
			className={`max-h-[1.3rem] flex-grow flex items-center justify-between px-4 text-[11px] text-zinc-400 bg-[#23272f] py-[-5px] border-t-[1px] border-[#4d4949] font-code w-full overflow-x-scroll overflow-y-hidden code-area`}
		>
			<div className="flex items-center gap-3 w-max">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout({ normal: `Current Project Type : ${project.type}` })
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<span className="font-semibold">{project.type.toUpperCase()}</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout({ normal: `Language Mode : ${currLng.toUpperCase()}` })
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<BsCode />
					<span>{currLng}</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout({ error: `Editor Errors: ${errors.length}` })
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<span className={`${errors.length > 0 ? "text-color-3" : ""}`}>
						errors: {errors.length}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-3 w-max">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout({ normal: `Editor Tab Size : ${codeTabSize}` })
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<MdOutlineKeyboardTab />
					<span>Tab Size: {codeTabSize}</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout({ normal: `Code Font Size : ${codeFontSize}` })
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<BiFontSize />
					<span>Code Font Size: {codeFontSize}</span>
				</div>
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout({
							normal: `Code Area Placeholder : ${holder ? holder : "''"}`,
						})
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<PiPlaceholder />
					<span>placeholder: {holder ? holder : "''"}</span>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div
					className="relative flex items-center gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-2 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout({
							success: `Enabled Editor Settings: 
							{ ${lineNo ? "Line-nos" : ""} \n ${closeBrackets ? ", Auto-bracket" : ""} \n ${
								foldGut ? ", Fold-gutter " : " "
							}}`,
						})
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<IoCheckmarkDone />
					<span>
						enabled:
						{`{${lineNo ? "line-nos" : ""}${
							closeBrackets ? ", auto-bracket" : ""
						}${foldGut ? ", fold-gutter" : ""}}`}
					</span>
				</div>
				<div
					className="flex gap-1 transition-all duration-500 hover:text-slate-200 hover:bg-slate-600 hover:bg-opacity-30 px-1 py-1 rounded-md cursor-pointer w-max"
					onMouseEnter={() =>
						showAbout({
							notification: `You have no notifications`,
						})
					}
					onMouseLeave={() => dispatch(resetNotifier())}
				>
					<div className="relative min-h-full flex">
						<VscBellDot size={14} />
						{editorNotifications.length > 0 && (
							<div className="absolute left-4 bottom-[-5px] max-h-6 text-blue-400 rounded-full">
								{editorNotifications.length}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorFooter;
