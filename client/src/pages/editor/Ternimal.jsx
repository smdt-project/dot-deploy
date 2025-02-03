import { javascript } from "@codemirror/lang-javascript";
import { indentUnit } from "@codemirror/language";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { BiInfoCircle, BiXCircle } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { PiWarningFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import SplitPane, { Pane } from "split-pane-react";
import UserReactComponent from "../../ui/UserReactComponent";
import { overridingScript } from "../../utils/constants";
import { updateLogs } from "./editorSlice";

const ErrorBox = ({ error }) => {
	return (
		<div
			className={`flex items-start gap-2 bg-[#70474764] bg-opacity-30 p-3 rounded-lg
		`}
		>
			<div className="bg-red-600 self-start p-[1px] text-slate-900 rounded-full bg-opacity-65">
				<MdClose />
			</div>
			<div className="flex-grow flex flex-col gap-1">
				<div className="flex items-start flex-wrap gap-1">
					<span className="text-red-600 font-semibold">
						{error.message.split(":")[0]}:
					</span>
					<span className="text-slate-300">
						{error.message.split(":").slice(1).join(":")}
					</span>
				</div>
				<span className="text-color-5 font-sans self-end font-semibold">
					{error.source}
				</span>
			</div>
		</div>
	);
};

const ErrorLog = ({ logs }) => {
	return (
		<div
			className={`w-full flex flex-col gap-2 p-2 border-b-[1px] border-[#555] `}
		>
			{logs.map(
				(log, index) =>
					log.type === "error" && <ErrorBox key={index} error={log.err} />
			)}
		</div>
	);
};

const MessageBox = ({ message }) => {
	return (
		<div
			className={`text-slate-300 bg-color-5 bg-opacity-20 rounded-md flex items-start gap-3 border-b-[1px] border-[#555] p-1 active:bg-color-7  active:text-white justify-between`}
		>
			<div className="flex gap-2">
				<div>
					<IoIosArrowForward className="self-start mt-1" />
				</div>
				<span>{message}</span>
			</div>
		</div>
	);
};

const MessageLog = ({ logs }) => {
	return (
		<div
			className={`w-full flex flex-col gap-2 p-2 border-b-[1px] border-[#555] `}
		>
			{logs.map(
				(log, index) =>
					log.type === "message" && (
						<MessageBox key={index} message={log.message} />
					)
			)}
		</div>
	);
};

const WarningBox = ({ warn }) => {
	return (
		<div
			className={`text-yellow-200 bg-yellow-300 bg-opacity-20 rounded-md flex items-start gap-3 border-b-[1px] border-[#555] p-1 active:bg-yellow-700  active:text-white justify-between `}
		>
			<div className="flex gap-2">
				<div>
					<PiWarningFill className="self-start mt-1" />
				</div>
				{warn}
				<span></span>{" "}
			</div>
		</div>
	);
};

const WarningLog = ({ logs }) => {
	return (
		<div
			className={`w-full flex flex-col gap-2 p-2 border-b-[1px] border-[#555] `}
		>
			{logs.map(
				(log, index) =>
					log.type === "warning" && (
						<WarningBox key={index} warn={log.warning} />
					)
			)}
		</div>
	);
};

const InfoBox = ({ info }) => {
	const [isHidden, setIsHidden] = useState(false);

	return (
		<div className="w-full text-slate-200 flex items-start gap-1">
			<div
				className="flex cursor-pointer text-slate-400 transition-all duration-300 hover:text-slate-50 self-start mt-1"
				onClick={() => setIsHidden((is) => !is)}
			>
				<IoIosArrowForward
					className={`transition-all duration-400 ${
						isHidden ? "rotate-90" : "rotate-0"
					}`}
				/>
			</div>
			{isHidden ? (
				<div className="text-slate-300">{`Current project data {...}`}</div>
			) : (
				<div className="flex-grow h-max code-scroll ">
					<CodeMirror
						readOnly
						value={info}
						height={"100%"}
						width={"100%"}
						theme={"dark"}
						extensions={[
							javascript(),
							EditorView.lineWrapping,
							indentUnit.of(4),
						]}
						basicSetup={{
							lineNumbers: false,
							tabSize: 4,
							mode: javascript(),
							syntaxHighlighting: true,
							foldGutter: true,
						}}
						style={{
							fontSize: "20px",
							paddingLeft: "",
						}}
					/>
				</div>
			)}
		</div>
	);
};

const InfoLog = ({ logs }) => {
	return (
		<div
			className={`w-full flex flex-col gap-1 border-b-[1px] border-[#555] py-1 `}
		>
			{logs.map(
				(log, index) =>
					log.type === "info" && <InfoBox key={index} info={log.info} />
			)}
		</div>
	);
};

const Terminal = ({ srcDoc, isOutput }) => {
	srcDoc = srcDoc.replace("/override/", overridingScript);
	const { logs } = useSelector((state) => state.editor);
	const { project, currLng, currCode } = useSelector((state) => state.project);
	const [sizes, setSizes] = useState([30, 70]);

	const allLogs = logs.map((log) => JSON.parse(log));
	const errors = allLogs.filter((log) => log.type === "error");
	const infos = allLogs.filter((log) => log.type === "info");
	const warnings = allLogs.filter((log) => log.type === "warning");
	const messages = allLogs.filter((log) => log.type === "message");

	const [selectedLog, setSelectedLog] = useState("info");
	let currLogs = [];
	if (selectedLog === "message") {
		currLogs = messages;
	} else if (selectedLog === "error") {
		currLogs = errors;
	} else if (selectedLog === "warning") {
		currLogs = warnings;
	} else if (selectedLog === "info") {
		currLogs = infos;
	}

	const dispatch = useDispatch();

	useEffect(() => {
		const handleMessages = (event) => {
			const { type, message } = event.data;

			if (type === "log" || type === "error") {
				const fileName =
					currLng === "css"
						? "style.css"
						: currLng === "html"
						? "index.html"
						: "script.js";
				const src =
					message.source === "about:srcdoc"
						? `${project.name.split(" ").join("_")}/${fileName}`
						: message.source;
				const err = { ...message, source: src };
				dispatch(updateLogs(JSON.stringify({ type, err })));
			}
		};

		window.addEventListener("message", handleMessages);
		return () => window.removeEventListener("message", handleMessages);
	}, [dispatch, currLng, project.name]);

	const resetSizes = (newSizes) => setSizes(newSizes);
	const selectLog = (log) => {
		if (log !== selectedLog) {
			setSelectedLog(log);
		}
	};

	return (
		<div className="h-[90%] border-l-[1px] border-r-[1px] border-[#353a47] flex flex-grow ">
			{currLng === "react" ? (
				<div className={`${isOutput ? "flex" : "hidden"} relative p-5`}>
					<UserReactComponent userJsx={currCode} />
				</div>
			) : (
				<iframe
					srcDoc={srcDoc}
					title="output"
					height={"100%"}
					width={"100%"}
					sandbox="allow-scripts"
					className={`${isOutput ? "flex" : "hidden"} `}
				/>
			)}

			<div
				className={`${
					isOutput ? "hidden" : "flex h-full w-full"
				} bg-[#5555551d] bg-opacity-50 text-white border-t-[1px] border-[#555] `}
			>
				<SplitPane
					split="vertical"
					sizes={sizes}
					onChange={resetSizes}
					style={{ height: "100%" }}
				>
					<Pane minSize={"20%"}>
						<div className="flex flex-col">
							<span className="text-slate-300 bg-[#5555553e] px-3 text-sm py-1">
								Your logs{" "}
							</span>
							<div className="flex flex-col gap-1 p-1">
								<button
									className={`${
										selectedLog === "message"
											? "bg-slate-500 bg-opacity-30"
											: ""
									} text-color-5 flex items-center gap-3 px-2 py-[2px] transition-none duration-300 hover:bg-slate-500 hover:bg-opacity-30`}
									onClick={() => selectLog("message")}
								>
									<FiMessageCircle />
									<span>
										{messages.length}
										<span className="hidden sm:inline"> Messages</span>
									</span>
								</button>
								<button
									className={`${
										selectedLog === "error" ? "bg-slate-500 bg-opacity-30" : ""
									} text-red-500 flex items-center gap-3 px-2 py-[2px] transition-none duration-300 hover:bg-slate-500 hover:bg-opacity-30`}
									onClick={() => selectLog("error")}
								>
									<BiXCircle />
									<span>
										{errors.length}
										<span className="hidden sm:inline"> Errors</span>
									</span>
								</button>
								<button
									className={`${
										selectedLog === "warning"
											? "bg-slate-500 bg-opacity-30"
											: ""
									} text-color-2 flex items-center gap-3 px-2 py-[2px] transition-none duration-300 hover:bg-slate-500 hover:bg-opacity-30`}
									onClick={() => selectLog("warning")}
								>
									<IoWarningOutline />
									<span>
										{warnings.length}{" "}
										<span className="hidden sm:inline"> Warnings</span>
									</span>
								</button>
								<button
									className={`${
										selectedLog === "info" ? "bg-slate-500 bg-opacity-30" : ""
									} text-slate-300 flex items-center gap-3 px-2 py-[2px] transition-none duration-300 hover:bg-slate-500 hover:bg-opacity-30`}
									onClick={() => selectLog("info")}
								>
									<BiInfoCircle />
									<span>
										{infos.length}
										<span className="hidden sm:inline"> Info</span>
									</span>
								</button>
							</div>
						</div>
					</Pane>
					<Pane minSize={"50%"}>
						<div
							className={`flex flex-col gap-2 h-full w-full bg-[#5555553c] bg-opacity-50 text-white border-l-[1px] border-[#555] overflow-x-hidden overflow-y-scroll code-scroll`}
						>
							{selectedLog === "message" && <MessageLog logs={currLogs} />}
							{selectedLog === "error" && <ErrorLog logs={currLogs} />}
							{selectedLog === "warning" && <WarningLog logs={currLogs} />}
							{selectedLog === "info" && <InfoLog logs={currLogs} />}
							{selectLog !== "error" && (
								<div className="text-slate-400">
									<IoIosArrowForward />
								</div>
							)}
						</div>
					</Pane>
				</SplitPane>
			</div>
		</div>
	);
};

export default Terminal;
