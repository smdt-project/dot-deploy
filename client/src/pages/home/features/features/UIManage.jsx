import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CgNotes, CgUiKit } from "react-icons/cg";
import { FaCode, FaRegImage } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Grid from "../../../../ui/Grid";
import StaticCodeBox from "../../../../ui/StaticCodeBox";
import { sampleUICodes } from "../../../../utils/constants";
import FeatureTopic from "./FeatureTopic";

const UICodeHeader = ({ defaultFileI, chooseFile, fileNames }) => {
	const [selectedFileI, setSelectedFileI] = useState(defaultFileI);

	const handleClick = (fileName, index) => {
		chooseFile(fileName);
		setSelectedFileI(index);
	};

	return (
		<div className="flex flex-col gap-3 border-b-2 border-slate-700 p-2 bg-slate-800 ">
			<div className="flex items-center gap-2">
				{Array.from("aaa").map((val, index) => (
					<div className=" w-3 h-3 bg-slate-700 rounded-full" key={index}></div>
				))}
			</div>
			<div className="flex items-center pl-2">
				{fileNames.map((fileName, index) => (
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

const UICode = ({ selectedUI, language, className }) => {
	const [selectedFile, setSelectedFile] = useState(selectedUI.files[0]);
	const fileNames = selectedUI.files.map((file) => file.fileName);

	let lng = language;
	if (lng === "node") {
		lng = "javascript";
	}

	const handleChoosingFile = (fileName) => {
		selectedUI.files.forEach((file) => {
			if (file.fileName === fileName) {
				setSelectedFile(file);
				return;
			}
		});
	};

	return (
		<div>
			<div
				className={`${className} w-[90dvw] sm:w-[30rem] d:w-[43rem] bg-slate-800 bg-opacity-60 rounded-lg border-2 border-slate-700 overflow-hidden md:-translate-y-[6.2rem] sm:-translate-y-[4rem]`}
			>
				<UICodeHeader
					defaultFileI={0}
					chooseFile={handleChoosingFile}
					fileNames={fileNames}
				/>

				<StaticCodeBox
					code={selectedFile.code}
					customStyle={{ background: "transparent" }}
					language={lng}
					numberStyle={{ color: "#757185" }}
					className={"h-[25rem]"}
				/>
			</div>
		</div>
	);
};

const UIDescription = ({ ui }) => {
	return (
		<div className="sample-ui-description w-full sm:w-64 bg-slate-800 flex flex-col gap-3 self-start p-4 rounded-lg bg-opacity-65">
			<div className=" w-full flex items-center gap-3 text-slate-300 border-b-2 border-slate-700 pb-1">
				<CgUiKit className="text-slate-400" size={20} />
				<span className="font-semibold">{ui.uiName}</span>
			</div>
			<div className="flex flex-col gap-2">
				<div className=" w-full flex items-center gap-3 text-slate-300 text-sm">
					<FaCode className="text-slate-400" />
					<span>Used techs</span>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					{ui.techs.map((event, index) => (
						<span
							key={index}
							className="bg-slate-700 px-2 rounded-md lowercase text-sm text-slate-300"
						>
							{event}
						</span>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className=" w-full flex items-center gap-3 text-slate-300 text-sm">
					<FiSettings className="text-slate-400" />
					<span>Handled events</span>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					{ui.events.map((event, index) => (
						<span
							key={index}
							className="bg-slate-700 px-2 rounded-md lowercase text-sm text-slate-300"
						>
							{event}
						</span>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-1">
				<div className=" w-full flex items-center gap-3 text-slate-300 text-sm">
					<CgNotes className="text-slate-400" />
					<span>Note</span>
				</div>
				<span className="text-sm text-slate-400 px-2 text-start line-clamp-2">
					{ui.note}
				</span>
			</div>
			<div className="flex items-center gap-2 text-sm text-color-3 text-opacity-70 transition-all duration-300 hover:text-opacity-100 cursor-pointer">
				<span>Show more</span> <IoIosArrowDown />
			</div>
			<div className=" flex items-center gap-2 justify-end mt-3 -mb-1">
				<BiEdit className="text-slate-400 transition-all duration-300 hover:text-slate-200 cursor-pointer" />
				<FaRegImage className="text-slate-400 transition-all duration-300 hover:text-slate-200 cursor-pointer" />
			</div>
		</div>
	);
};

const UIList = ({ className, ui }) => {
	return (
		<div className="relative w-full md:w-1/2 h-full flex sm:flex-row flex-col-reverse gap-10 overflow-x-hidden px-10 sm:m-0 -mt-10">
			<div className="absolute h-full w-20 left-0 bg-gradient-to-r from-n-8 from-5% " />
			<UIDescription ui={ui} />
			<div className={`${className}  flex flex-1 items-center justify-center`}>
				{ui.component}
			</div>
			<div className="absolute h-full w-20 right-0 bg-gradient-to-l from-n-8 from-5% " />
		</div>
	);
};

const uiCodes = sampleUICodes;

const UISamples = () => {
	const [currIndex, setCurrIndex] = useState(0);
	const uiSampleRef = useRef();

	useGSAP(() => {
		const timeline = gsap.timeline({
			repeat: 0,
		});
		let interval;

		const update = () => {
			interval = setTimeout(() => {
				setCurrIndex((i) => (i < uiCodes.length - 1 ? i + 1 : 0));
			}, 5000);
		};

		timeline
			.from(".ui-manage .sample-ui-code", {
				x: "100%",
				opacity: 0.1,
				duration: 1,
				ease: "power3.out",
			})
			.from(".ui-manage .ui-list .sample-ui", {
				y: "-100%",
				opacity: 0,
				duration: 1,
				yoyo: true,
				ease: "power3.out",
			})
			.from(".sample-ui-description", {
				x: "-100%",
				opacity: 0,
				duration: 1,
				yoyo: true,
				ease: "power3.out",
			})
			.call(() => update());

		return () => {
			timeline.kill();
			clearTimeout(interval);
		};
	}, [currIndex]);

	return (
		<div
			ref={uiSampleRef}
			className="ui-manage w-full h-full flex md:items-start sm:items-center flex-col sm:flex-col-reverse md:flex-auto md:flex-row "
		>
			<UIList className={"ui-list"} ui={uiCodes[currIndex]} />
			<UICode
				selectedUI={uiCodes[currIndex]}
				language={"javascript"}
				className={"sample-ui-code"}
			/>
		</div>
	);
};

const UIManage = ({ feature }) => {
	return (
		<section id={feature.id} className="flex flex-col overflow-x-hidden">
			<FeatureTopic feature={feature} />
			<div className=" w-screen flex my-14">
				<Grid />
				<UISamples />
			</div>
		</section>
	);
};

export default UIManage;
