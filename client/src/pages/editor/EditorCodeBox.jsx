import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pane } from "split-pane-react";
import SplitPane from "split-pane-react/esm/SplitPane";
import "split-pane-react/esm/themes/default.css";
import { useUiUpdate } from "../../hooks/useUiUpdate";
import EditorToolTip from "../../ui/EditorToolTip";
import FileNameTab from "../../ui/FileNameTab";
import PublishModal from "../../ui/PublishModal";
import { resetNotifier } from "../../ui/notifierSlice";
import Editor from "./Editor";
import EditorModal from "./EditorModal";
import ResultTerminal from "./ResultTernimal";
import { updateLogs, updateSplit } from "./editorSlice";
import SideMenu from "./features/sidebar/SideMenu";
import { updateProjectRequest } from "./projectSlice";

const CodeBoxHeader = ({ lngName }) => {
	const { showTerminal, splitDxr } = useSelector((state) => state.editor);
	const { project, currLng } = useSelector((state) => state.project);

	const isSnippet = project.type === "snippet";

	const [isVHovered, setIsVHovered] = useState(false);
	const [isHHovered, setIsHHovered] = useState(false);
	const dispatch = useDispatch();
	const handleSelection = useUiUpdate();

	const handleSplit = (dxr) => dispatch(updateSplit(dxr));

	return (
		<div className="flex items-center justify-between h-9 mb-1 shadow-md border-[1px] border-[#3d3d3d82]">
			<div className="flex items-center h-full">
				{isSnippet ? (
					<button
						className={`border-b-color-3 border-b-2 text-sm text-slate-400 px-2 py-1 uppercase`}
					>
						{currLng}
					</button>
				) : (
					["html", "css", "js"].map((lng, index) => (
						<FileNameTab
							lngName={lng}
							key={index}
							handleSelection={handleSelection}
							selectedLng={currLng}
						/>
					))
				)}
			</div>
			{showTerminal && (
				<div className="flex items-start gap-1 pr-1">
					<div className="relative flex items-center justify-center">
						<button
							className={`flex items-center justify-center ${
								splitDxr === "horizontal" && "bg-slate-600 bg-opacity-80"
							} transition-all duration-300 hover:bg-slate-600 hover:bg-opacity-80 p-[4px] rounded-md`}
							onClick={() => handleSplit("horizontal")}
							onMouseEnter={() => setIsVHovered(true)}
							onMouseLeave={() => setIsVHovered(false)}
						>
							<img src="/assets/ui_y.png" alt="" width={18} />
						</button>
						{isVHovered && (
							<EditorToolTip
								dxr={"down"}
								content={
									splitDxr === "horizontal"
										? "vertically split"
										: "split vertically"
								}
							/>
						)}
					</div>
					<div className="relative flex items-center justify-center">
						<button
							className={`flex items-center justify-center ${
								splitDxr === "vertical" && "bg-slate-600 bg-opacity-80"
							} transition-all duration-300 hover:bg-slate-600 hover:bg-opacity-80 p-[4px] rounded-md`}
							onClick={() => handleSplit("vertical")}
							onMouseEnter={() => setIsHHovered(true)}
							onMouseLeave={() => setIsHHovered(false)}
						>
							<img src="/assets/ui_x.png" alt="" width={18} />
						</button>
						{isHHovered && (
							<EditorToolTip
								dxr={"down"}
								content={
									splitDxr === "vertical"
										? "horizontally split"
										: "split horizontally"
								}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

const EditorCodeBox = () => {
	const { project, currLng, currCode } = useSelector((state) => state.project);
	const { isCreating, showTerminal, showSideMenu, splitDxr, isPublishing } =
		useSelector((state) => state.editor);
	const { autoSave, notifyInterval } = useSelector((state) => state.setting);
	const { lastSave, savedProject } = useSelector((state) => state.save);
	const isSnippet = project.type === "snippet";
	const hasCodeChanged = !isEqual(savedProject, project);

	let htmlCode = "";
	let cssCode = "";
	let jsCode = "";

	if (!isSnippet) {
		htmlCode = project.code.html;
		cssCode = project.code.css;
		jsCode = project.code.js;
	}

	const lng = currLng;
	const code = currCode;

	const selectedMode =
		lng === "react"
			? javascript({ jsx: true })
			: lng === "html"
			? html()
			: lng === "css"
			? css()
			: javascript();

	const [sizes, setSizes] = useState(showTerminal ? [70, 30] : [100, 0]);
	const [horizSizes, setHorizSizes] = useState([15, 85]);
	5;
	const srcDoc = `
		<html>
			<style>${cssCode} </style>
			<body>
				${htmlCode ? htmlCode : ""}
			</body>
			/override/
			<script>${jsCode}</script>
		</html>
		`;
	const date = new Date();

	const dispatch = useDispatch();

	useEffect(() => {
		let interval;
		interval = setInterval(() => {
			if (autoSave && hasCodeChanged) {
				if (Date.now() - lastSave > notifyInterval) {
					dispatch(resetNotifier());
					dispatch(updateProjectRequest(project));
					dispatch(
						updateLogs(
							JSON.stringify({
								type: "info",
								info: `Changes are auto saved - ${date.toISOString()}`,
							})
						)
					);
				}
			}
		}, notifyInterval * 1000);

		return () => clearInterval(interval);
	}, [notifyInterval, autoSave, hasCodeChanged, lastSave, dispatch]);

	const resizeTerminal = (newSizes) => {
		setSizes(newSizes);
	};
	const resizeHorizontals = (newSizes) => {
		setHorizSizes(newSizes);
	};

	return (
		<div className="relative bg-n-14 w-full h-full overflow-hidden flex flex-col ">
			{isCreating && <EditorModal />}
			{isPublishing && <PublishModal />}
			{showTerminal ? (
				showSideMenu ? (
					<SplitPane
						split="vertical"
						sizes={horizSizes}
						onChange={resizeHorizontals}
						style={{ height: "94.8dvh" }}
					>
						<SideMenu />
						<Pane minSize={"20%"}>
							<CodeBoxHeader isSnippet={isSnippet} lngName={lng} />
							<SplitPane
								split={splitDxr}
								sizes={sizes}
								onChange={setSizes}
								style={{
									height: "95%",
									minWidth: "20% ",
								}}
							>
								<Pane>
									<Editor code={code} mode={selectedMode} />
								</Pane>

								<Pane minSize={"10%"}>
									<ResultTerminal
										resizeTerminal={resizeTerminal}
										srcDoc={srcDoc}
									/>
								</Pane>
							</SplitPane>
						</Pane>
					</SplitPane>
				) : (
					<>
						<CodeBoxHeader isSnippet={isSnippet} lngName={currLng} />
						<SplitPane
							split={splitDxr}
							sizes={sizes}
							onChange={setSizes}
							style={{ height: "95%", minWidth: "20%" }}
						>
							<Pane>
								<Editor code={code} mode={selectedMode} />
							</Pane>
							<Pane minSize={"10%"}>
								<ResultTerminal
									resizeTerminal={resizeTerminal}
									srcDoc={srcDoc}
								/>
							</Pane>
						</SplitPane>
					</>
				)
			) : showSideMenu ? (
				<SplitPane
					split="vertical"
					sizes={horizSizes}
					onChange={resizeHorizontals}
					style={{ height: "100%" }}
				>
					<SideMenu />
					<Pane minSize={"20%"}>
						<CodeBoxHeader isSnippet={isSnippet} lngName={currLng} />
						<div className="h-[95%]">
							<Editor code={code} mode={selectedMode} />
						</div>
					</Pane>
				</SplitPane>
			) : (
				<>
					<CodeBoxHeader isSnippet={isSnippet} lngName={currLng} />
					<div className=" h-[95%]">
						<Editor code={code} mode={selectedMode} />
					</div>
				</>
			)}
		</div>
	);
};

export default EditorCodeBox;
