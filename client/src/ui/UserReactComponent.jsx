import * as Babel from "@babel/standalone";
import { useEffect, useState } from "react";
import JsxParser from "react-jsx-parser";
import { useDispatch } from "react-redux";
import { updateLogs } from "../pages/editor/editorSlice";

function isValidJSX(jsxString) {
	try {
		Babel.transform(jsxString, {
			presets: ["react"],
		});
		return null;
	} catch (error) {
		return { message: error.message, source: "parsing : component.jsx" };
	}
}

const UserReactComponent = ({ userJsx }) => {
	const [err, setErr] = useState(isValidJSX(userJsx));
	const dispatch = useDispatch();

	useEffect(() => {
		try {
			Babel.transform(userJsx, {
				presets: ["react"],
			});
			setErr(null);
		} catch (error) {
			setErr({
				message: error.message.split("\n")[0],
				source: "parsing : component.jsx",
			});
		}
	}, [userJsx]);

	useEffect(() => {
		if (err) {
			dispatch(updateLogs(JSON.stringify({ type: "error", err })));
		}
	}, [err, dispatch]);

	const handleParseError = (error) => {
		setErr({
			message: `Rendering error: ${error.message}`,
			source: "rendering: component.jsx",
		});
	};

	if (!err) {
		return (
			<div className="relative p-5">
				<JsxParser
					jsx={userJsx}
					autoCloseVoidElements
					onError={(error) => handleParseError(error)}
				/>
			</div>
		);
	} else {
		return (
			<div className="w-full h-full overflow-y-scroll relative p-5 code-area">
				<div className="w-full flex items-center justify-center gap-2 bg-red-500 bg-opacity-20 border-2 border-red-500 p-5 rounded-md font-bold text-lg tracking-wider">
					<span className="capitalize text-red-50">{err.message}</span>
					<div className="flex items-center text-red-500">
						{err.line && <span>line: {err.line}</span>}
						{err.column && <span>, col: {err.column}</span>}
					</div>
				</div>
			</div>
		);
	}
};

export default UserReactComponent;
