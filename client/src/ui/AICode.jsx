import { useState } from "react";
import { sampleCodes } from "../utils/constants";
import StaticCodeBox from "./StaticCodeBox";

const AICodeHeader = ({ defaultFileI, chooseFile }) => {
	const [selectedFileI, setSelectedFileI] = useState(defaultFileI);

	const handleClick = (fileName, index) => {
		chooseFile(fileName);
		setSelectedFileI(index);
	};

	return (
		<div className="flex flex-col gap-3 border-b-2 border-slate-700 p-2 bg-slate-800">
			<div className="flex items-center gap-2">
				{Array.from("aaa").map((val, index) => (
					<div className=" w-3 h-3 bg-slate-700 rounded-full" key={index}></div>
				))}
			</div>
			<div className="flex items-center px-2 overflow-x-scroll slide-scroll">
				{[
					"AI.js",
					"AIHeader.js",
					"QuickQ.js",
					"Question.js",
					"InputBox.js",
					"constant.js",
				].map((fileName, index) => (
					<button
						key={index}
						className={`font-bold px-2 border-b-2 transition-all duration-300 ${
							selectedFileI === index
								? "border-color-8 text-color-8"
								: "text-slate-400 border-slate-800 hover:text-slate-300"
						}`}
						onClick={() => handleClick(fileName, index)}
					>
						{fileName}
					</button>
				))}
			</div>
		</div>
	);
};

const AICode = () => {
	const [files] = useState(sampleCodes[0].codes);
	const [selectedFile, setSelectedFile] = useState(files[0]);

	const handleChoosingFile = (fileName) => {
		files.forEach((file) => {
			if (file.fileName === fileName) {
				setSelectedFile(file);
				return;
			}
		});
	};

	return (
		<pre className=" w-[98vw] sm:w-[90vw] md:w-[45vw] bg-slate-800 bg-opacity-60 rounded-lg -translate-y-[5rem] border-2 border-slate-700 ">
			<AICodeHeader defaultFileI={0} chooseFile={handleChoosingFile} />
			<StaticCodeBox
				code={selectedFile.code}
				language={"javascript"}
				customStyle={{ background: "transparent" }}
				numberStyle={{ color: "#757185" }}
				className={"h-[30rem]"}
			/>
		</pre>
	);
};

export default AICode;
