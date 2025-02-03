import { useEffect, useRef, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { TbMinimize, TbMinus, TbSquare, TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEditorOpen } from "../../hooks/useEditorOpen";
import {
	handleCreatingModal,
	minimizeCreatingModal,
	resetPublishingModal,
	setNewProject,
} from "./editorSlice";

const EditorModal = () => {
	const { newProLngName, newProType, newProName } = useSelector(
		(state) => state.editor
	);
	const [name, setName] = useState(newProName);
	const [isExpanded, setIsExpanded] = useState(false);
	const textareaRef = useRef();
	const dispatch = useDispatch();
	const openEditor = useEditorOpen();
	const isSnippet = newProType === "snippet";

	useEffect(() => {
		const handleSubmission = (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				toNext();
			}
		};

		textareaRef.current.addEventListener("keydown", handleSubmission);

		return textareaRef.current.addEventListener("keydown", handleSubmission);
	}, [name, dispatch]);

	const toNext = () => {
		const isSnippet = newProType === "snippet";

		openEditor(newProType, newProLngName, {
			name: name ? name : "Untitled",
			type: newProType,
			lngName: newProLngName,
			code: isSnippet ? { code: "" } : { html: "", css: "", js: "" },
			owner: {},
		});
		dispatch(resetPublishingModal());
	};

	const maximizeModal = () => setIsExpanded((is) => !is);
	const minimizeModal = () => {
		dispatch(handleCreatingModal(false));
		dispatch(minimizeCreatingModal(name));
	};
	const closeModal = () => {
		dispatch(handleCreatingModal(false));
		dispatch(setNewProject({ type: null, lngName: null }));
	};

	return (
		<div className="absolute left-0 z-[100] w-full h-full flex justify-center backdrop-blur-sm">
			<div
				className={`flex flex-col ${
					isExpanded
						? "w-full h-full text-lg"
						: "w-[35rem] h-max min-h-[20rem] mt-24"
				} rounded-lg border-[1px] border-slate-700 overflow-hidden shadow-lg shadow-slate-900`}
			>
				<div className="flex items-center justify-between bg-gray-800 border-b-[1px] border-slate-700 px-2 py-[5px]">
					<div className="flex items-center gap-2 text-slate-500 text-sm">
						<img src="/dot.svg" alt="" width={15} className=" invert" />
						<span className="capitalize">
							DOTCODE/creating-{isSnippet ? "code-snippet" : "ui-componet"}
						</span>
					</div>
					<div className="flex gap-1">
						{[
							{
								icon: <TbMinus key={1} size={17} />,
								onClick: () => minimizeModal(),
							},
							{
								icon: isExpanded ? (
									<TbMinimize key={2} size={19} />
								) : (
									<TbSquare key={2} size={15} />
								),
								onClick: () => maximizeModal(),
							},
							{
								icon: <TbX key={3} size={17} />,
								onClick: () => closeModal(),
							},
						].map((tab, index) => (
							<button
								className={`text-xl text-slate-400 p-[2px] w-6 flex items-center justify-center transition-all duration-300 hover:text-slate-50 rounded-md ${
									index === 2
										? "hover:bg-red-700 "
										: "hover:bg-[#555] hover:bg-opacity-40"
								}`}
								key={index}
								onClick={tab.onClick}
							>
								{tab.icon}
							</button>
						))}
					</div>
				</div>
				<div className="flex flex-grow justify-between flex-col bg-n-13 py-2 px-4">
					<div className="flex items-start gap-1">
						<span className="flex items-center text-slate-400">
							Dot:\{isSnippet ? "Code-Snippet" : "Ui-Component"}\
							{isSnippet ? newProLngName : "Html-Css-Js"}
							<IoIosArrowForward opacity={0.7} />
						</span>
						<textarea
							ref={textareaRef}
							type="text"
							placeholder={
								isSnippet ? "name-your-snippet" : "name-your-ui-component"
							}
							className="h-52 resize-none bg-transparent border-none outline-none flex-grow text-slate-400 placeholder:text-slate-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
						/>
					</div>

					<div
						className={`flex justify-end md:justify-between md:text-sm text-slate-400 border-t-[1px] border-slate-600 pt-2`}
					>
						<span className="hidden md:flex items-center gap-1 ">
							press{" "}
							<span className="flex items-center text-slate-300 bg-slate-600 px-2 py-[1px] rounded-md">
								ENTER <AiOutlineEnter />
							</span>{" "}
							to go to next step
						</span>
						<button
							className="flex text-slate-300 bg-slate-600 px-2 py-[1px] rounded-md hover:bg-slate-500 active:bg-slate-500"
							onClick={() => toNext()}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorModal;
