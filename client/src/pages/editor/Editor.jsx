import { indentUnit } from "@codemirror/language";
import { searchKeymap } from "@codemirror/search";
import CodeMirror, { EditorView, keymap, oneDark } from "@uiw/react-codemirror";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useCode } from "../../hooks/useCode";
import { getLngInfo } from "../../utils/helpers";

const Editor = ({ code }) => {
	const { codeFontSize, codeTabSize, closeBrackets, lineNo, foldGut, holder } =
		useSelector((state) => state.setting);
	const { searchPanel } = useSelector((state) => state.editor);
	const { currLng } = useSelector((state) => state.project);
	const tabSize = Array.from({ length: codeTabSize }, () => " ").join("");
	const [editorView, setEditorView] = useState(null);
	const updateCode = useCode();
	const editorRef = useRef();

	const mode = getLngInfo(currLng).mode;

	// Initialize the editor view and store a reference to it
	const handleEditorCreate = (view) => setEditorView(view);

	useEffect(() => {
		if (editorView) {
			if (searchPanel) {
				editorView.focus();
				const fEvent = new KeyboardEvent("keydown", {
					key: "f",
					code: "KeyF",
					ctrlKey: true,
					bubbles: true,
					cancelable: true,
				});
				editorView.contentDOM.dispatchEvent(fEvent);
			} else {
				editorView.focus();
				const esCEvent = new KeyboardEvent("keydown", {
					key: "Escape",
					code: "Escape",
					bubbles: true,
					cancelable: true,
				});
				editorView.contentDOM.dispatchEvent(esCEvent);
			}
		}
	}, [searchPanel, editorView]);

	const handleChange = (value) => updateCode(value, currLng);

	return (
		<CodeMirror
			ref={editorRef}
			value={code}
			theme={oneDark}
			extensions={[
				mode,
				EditorView.lineWrapping,
				indentUnit.of(tabSize),
				keymap.of(searchKeymap),
			]}
			placeholder={holder}
			basicSetup={{
				foldGutter: foldGut,
				lineNumbers: lineNo,
				tabSize: codeTabSize,
				mode: mode,
				syntaxHighlighting: true,
				closeBrackets: closeBrackets,
			}}
			style={{
				fontSize: `${codeFontSize}px`,
				paddingLeft: "1.25rem",
				paddingBottom: "2rem",
				height: "100%",
				width: "100%",
			}}
			className="overflow-y-scroll overflow-x-hidden code-scroll"
			onChange={handleChange}
			onCreateEditor={handleEditorCreate}
		/>
	);
};

export default Editor;
