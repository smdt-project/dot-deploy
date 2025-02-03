import { javascript } from "@codemirror/lang-javascript";
import { indentUnit } from "@codemirror/language";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { TbCopy } from "react-icons/tb";
import { copyTextToClipboard } from "../utils/helpers";
import FileNameTab from "./FileNameTab";

const Editor = ({ code, mode, height, width, style }) => {
	return (
		<CodeMirror
			readOnly
			value={code}
			height={height ? height : "100%"}
			width={width ? width : "100%"}
			theme={"dark"}
			extensions={[mode, EditorView.lineWrapping, indentUnit.of(4)]}
			basicSetup={{
				tabSize: 4,
				mode: mode,
				syntaxHighlighting: true,
			}}
			style={
				style
					? style
					: {
							fontSize: "20px",
							paddingLeft: "1.25rem",
					  }
			}
		/>
	);
};

const CodeHeader = ({ project, code, setCode }) => {
	const [lngName, setLngName] = useState("html");
	const [copied, setCopied] = useState(false);

	const isSnippet = project.type !== "ui";

	useEffect(() => {
		let timeout;
		if (copied) {
			timeout = setTimeout(() => {
				setCopied(false);
			}, 4000);
		}

		return () => clearTimeout(timeout);
	}, [copied]);

	const handleSelection = (lng) => {
		setLngName(lng);
		if (lng === "html") {
			setCode(project.code.html);
		} else if (lng === "css") {
			setCode(project.code.css);
		} else {
			setCode(project.code.js);
		}
	};

	const handleCopy = async () => await copyTextToClipboard(code, setCopied);

	return (
		<div className="flex items-center justify-between min-h-9 w-full mb-1 ml-1">
			<div className="flex items-center h-full">
				{isSnippet ? (
					<button
						className={`border-b-color-3 border-b-2 text-sm text-slate-400 px-2 py-1 uppercase`}
					>
						{project.lngName}
					</button>
				) : (
					["html", "css", "js"].map((lng, index) => (
						<FileNameTab
							lngName={lng}
							key={index}
							handleSelection={handleSelection}
							selectedLng={lngName}
						/>
					))
				)}
			</div>
			<div
				className={`${
					copied
						? ""
						: "hover:bg-color-5 hover:text-slate-900 rounded-lg active:bg-color-6"
				} flex items-center gap-1 text-sm text-slate-400 px-2 py-[1px] mr-1 cursor-pointer transition-all duration-300`}
				onClick={() => handleCopy()}
			>
				{copied ? (
					<span className="text-green-500 flex items-center gap-[2px]">
						<BiCheck size={18} /> copied!
					</span>
				) : (
					<>
						<TbCopy />
						<span>copy</span>
					</>
				)}
			</div>
		</div>
	);
};

const CodeBox = ({ project, style, height, width }) => {
	const isSnippet = project.type === "snippet";

	const [code, setCode] = useState(
		isSnippet ? project.code.code : project.code.html
	);

	return (
		<div
			className={` ${height} ${width} flex flex-col bg-n-14 rounded-md overflow-hidden p-1 pl-0 gap-3`}
		>
			<CodeHeader project={project} setCode={setCode} code={code} />
			<div className="h-full code-scroll m-1">
				<Editor
					code={code}
					lng={"javascript"}
					mode={javascript()}
					style={style}
				/>
			</div>
		</div>
	);
};

export default CodeBox;
