import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { IoRefresh } from "react-icons/io5";
import { TbMinimize, TbMinus, TbSquare, TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEditorOpen } from "../hooks/useEditorOpen";
import {
	handlePublishModal,
	minimizePublishingModal,
	resetPublishingModal,
} from "../pages/editor/editorSlice";
import {
	saveRequest,
	saveReset,
} from "../pages/editor/features/editorheader/saveSlice";
import Error from "./Error";
import Loading from "./Loading";

const PublishModal = () => {
	const { project, isNew } = useSelector((state) => state.project);
	const { isLoading, error, isPublishingDone } = useSelector(
		(state) => state.save
	);
	const { publishingData, isExpanding } = useSelector((state) => state.editor);
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const isSnippet = project.type === "snippet";
	const title = isSnippet ? "Dot:/publishing-code" : "Dot:/publishing-ui";

	const dispatch = useDispatch();
	const openEditor = useEditorOpen();

	const [projectName, setProjectName] = useState(
		isExpanding ? publishingData.name : isNew ? project.name : project.name
	);
	const [description, setDescription] = useState(
		isExpanding ? publishingData.description : isNew ? "" : project.description
	);
	const [tags, setTags] = useState([]);
	const [status, setStatus] = useState(
		isExpanding ? publishingData.status : "name"
	);
	const [value, setValue] = useState(
		isExpanding ? publishingData.tags.join(" ") : ""
	);
	const [isExpanded, setIsExpanded] = useState("");
	const [visibility, setVisibility] = useState(
		isExpanding
			? publishingData.visibility
			: isNew
			? "public"
			: project.visibility
	);

	const nameRef = useRef();
	const descRef = useRef();
	const tagsRef = useRef();
	const publishRef = useRef();

	useEffect(() => {
		const handleSubmission = (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				toNext();
			}
		};

		// Select the appropriate ref based on status
		const activeRef =
			status === "name"
				? nameRef
				: status === "description"
				? descRef
				: status === "tags"
				? tagsRef
				: status === "finished"
				? publishRef
				: "";
		if (activeRef.current) {
			activeRef.current.addEventListener("keydown", handleSubmission);
		}

		// Clean up event listener on unmount or re-render
		return () => {
			if (activeRef.current) {
				activeRef.current.removeEventListener("keydown", handleSubmission);
			}
		};
	}, [status, projectName, value, description]);

	const publish = () => {
		const newProject = {
			name: projectName,
			description: description,
			visibility: visibility,
			type: project.type,
			lngName: project.lngName,
			code: project.code,
			owner: user.userId,
			tags: tags,
		};

		dispatch(saveRequest(newProject));
		dispatch(resetPublishingModal());
	};

	const toNext = () => {
		if (status === "name" && projectName.trim() !== "") {
			if (isNew) {
				setStatus("description");
			} else {
				if (project.name !== projectName) {
					setStatus("description");
				}
			}
		} else if (status === "description") {
			setStatus("tags");
		} else if (status === "tags") {
			setTags(value.split(" ").filter((v) => !isEmpty(v.trim())));
			setStatus("visibility");
		} else if (status === "visibility") {
			setStatus("finished");
		} else if (status === "finished" && visibility.trim()) {
			publish();
		}
	};

	const refresh = () => {
		setStatus("name");
		setProjectName(isNew ? project.name : "");
		setDescription(isNew ? "" : project.description);
		setTags([]);
		setValue("");
		setVisibility(isNew ? "public" : project.visibility);
	};

	const cancel = () => {
		dispatch(handlePublishModal(false));
		dispatch(resetPublishingModal());
	};
	const maximizeModal = () => setIsExpanded((is) => !is);
	const minimizeModal = () => {
		const newProject = {
			name: projectName,
			description: description,
			visibility: visibility,
			tags: tags,
			status: status,
		};
		dispatch(minimizePublishingModal(newProject));
		dispatch(handlePublishModal(false));
	};

	const handleVisibility = (v) => {
		if (status === "visibility") {
			setVisibility(v);
			toNext();
		}
	};

	const tryAgain = () => {
		dispatch(saveReset());
		refresh();
	};

	const gotoBack = () => {
		dispatch(saveReset());
		cancel();
		openEditor("open", project.lngName, project);
	};

	return (
		<div className="absolute left-0 z-[100] w-full h-full flex backdrop-blur-sm">
			<div
				className={`flex flex-col ${
					isExpanded ? "w-full h-full" : "w-[35rem] h-max min-h-[20rem]  m-5"
				} rounded-lg border-[1px] border-slate-700 overflow-hidden shadow-lg shadow-slate-900`}
			>
				<div className="flex items-center justify-between bg-gray-800 border-b-[1px] border-slate-700 px-2 py-[5px]">
					<div className="flex items-center gap-2 text-slate-400 text-sm">
						<img src="/dot.svg" alt="" width={15} className=" invert" />
						<span>
							DOTCODE/{isNew ? "publishing" : `Saving ${project.name} As `}{" "}
							{projectName}
						</span>
					</div>
					<div className="flex items-center gap-2">
						{status !== "name" && (
							<span
								className={`text-xl text-slate-400 cursor-pointer transition-all duration-300 h-5 flex items-center justify-center rounded-md w-5 hover:bg-slate-700 hover:text-slate-50 active:bg-slate-600`}
								onClick={() => refresh()}
							>
								<IoRefresh key={3} size={17} className="rotate-45" />
							</span>
						)}
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
									onClick: () => cancel(),
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
				</div>
				{isLoading && (
					<div className="flex flex-grow items-center justify-center bg-n-13">
						<Loading message={`Publishing '${projectName}' ${visibility}ly`} />
					</div>
				)}
				{isPublishingDone && (
					<div className="flex flex-col gap-3 flex-grow items-center justify-center bg-n-13">
						<span className="text-green-500 tracking-wider">
							`{projectName}` published {visibility}ly!
						</span>
						<button
							className="text-slate-300 underline underline-offset-2 transition-all duration-300 hover:text-color-5"
							onClick={() => gotoBack()}
						>
							back to editor
						</button>
					</div>
				)}
				{error && (
					<div className="flex flex-grow items-center justify-center bg-n-13">
						<Error message={error} tryAgain={tryAgain} />
					</div>
				)}
				{!isLoading && !error && !isPublishingDone && isUserSignedIn && (
					<div className="flex flex-col flex-grow justify-between bg-n-13 py-2 px-4">
						<div className="flex flex-col flex-grow gap-2">
							<div className="flex items-start gap-1">
								<span className="flex items-center text-slate-400">
									{title}
									<IoIosArrowForward opacity={0.7} />
								</span>
								<div className="flex-grow flex gap-2 pt-[1px]">
									<span className="text-sm text-slate-500">
										name{" "}
										{isNew ? (
											<span
												className={` ${
													projectName ? " text-green-700 " : " text-red-700"
												}`}
											>
												*
											</span>
										) : (
											<span
												className={` ${
													projectName && project.name !== projectName
														? " text-green-700 "
														: " text-red-700"
												}`}
											>
												*
											</span>
										)}{" "}
										:
									</span>
									<input
										ref={nameRef}
										type="text"
										placeholder={`${
											isSnippet ? "name-this-snippet" : "name-this-component"
										}`}
										className="flex-grow bg-transparent border-none outline-none text-slate-400 placeholder:text-slate-500"
										value={projectName}
										onChange={(e) => setProjectName(e.target.value)}
										autoFocus
										disabled={status !== "name"}
									/>
								</div>
							</div>
							{status !== "name" && (
								<div className="flex items-start gap-1">
									<span className="flex items-center text-slate-400">
										{title}
										<IoIosArrowForward opacity={0.7} />
									</span>
									<div className="flex-grow flex gap-2 pt-[1px]">
										<span className="text-sm text-slate-500">desc:</span>
										<textarea
											ref={descRef}
											type="text"
											placeholder="add description / note"
											className="resize-none bg-transparent border-none outline-none flex-grow text-slate-400 placeholder:text-slate-500 code-area"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											autoFocus
											disabled={status !== "description"}
										/>
									</div>
								</div>
							)}
							{status !== "name" && status !== "description" && (
								<div className="flex items-start gap-1">
									<span className="flex items-center text-slate-400">
										{title}
										<IoIosArrowForward opacity={0.7} />
									</span>
									<div className="flex-grow flex items-start gap-2 pt-[1px]">
										<span className="text-sm text-slate-500">tags:</span>
										<textarea
											ref={tagsRef}
											type="text"
											placeholder="add tags /space them/"
											className="resize-none bg-transparent border-none outline-none flex-grow text-slate-400 placeholder:text-slate-500  code-area"
											value={value}
											onChange={(e) => setValue(e.target.value)}
											autoFocus
											disabled={status !== "tags"}
										/>
									</div>
								</div>
							)}

							{status !== "name" &&
								status !== "description" &&
								status !== "tags" && (
									<div className="flex items-start gap-1">
										<span className="flex items-center text-slate-400">
											{title}
											<IoIosArrowForward opacity={0.7} />
										</span>
										<div className="flex-grow flex gap-2 pt-[1px]">
											<span className="text-sm text-slate-500">
												{status !== "finished" && "choose"} visibility{" "}
												<span
													className={` ${
														visibility ? " text-green-700 " : " text-red-700"
													}`}
												>
													*
												</span>{" "}
												:{" "}
											</span>
											<div className="flex items-center gap-1">
												{status === "finished" ? (
													<span className="text-slate-400 capitalize">
														{visibility}
													</span>
												) : (
													<>
														<button
															className={`${
																visibility === "public"
																	? "bg-slate-700  "
																	: "bg-slate-800"
															}  px-2 rounded-md text-slate-300 transition-all duration-300 hover:bg-slate-600 hover:text-slate-50`}
															onClick={() => handleVisibility("public")}
														>
															Public
														</button>
														<button
															className={`${
																visibility === "private"
																	? "bg-slate-700  "
																	: "bg-slate-800"
															} px-2 rounded-md text-slate-300 transition-all duration-300 hover:bg-slate-600 hover:text-slate-50`}
															onClick={() => handleVisibility("private")}
														>
															Private
														</button>
													</>
												)}
											</div>
										</div>
									</div>
								)}
							{status === "finished" && (
								<>
									<div className="flex items-start gap-1">
										<span className="flex items-center text-slate-400">
											{title}
											<IoIosArrowForward opacity={0.7} />
										</span>

										<div className="flex items-start gap-2 pt-[1px]">
											<span className="text-sm md:text-md text-color-5 font-bold tracking-wide">
												Publish {visibility}ly ?
											</span>
											<textarea
												ref={publishRef}
												type="text"
												className=" -mt-1 resize-none bg-transparent border-none outline-none flex-grow text-color-5 placeholder:text-slate-400"
												autoFocus
												disabled
											/>
										</div>
									</div>
								</>
							)}
						</div>
						{status !== "visibility" && (
							<div
								className={`flex justify-end ${
									status === "finished"
										? "md:justify-end"
										: "md:justify-between"
								} md:text-sm text-slate-400 border-t-[1px] border-slate-600 pt-2`}
							>
								{status !== "finished" && (
									<span className="hidden md:flex items-center gap-1 ">
										press{" "}
										<span className="flex items-center text-slate-300 bg-slate-600 px-2 py-[1px] rounded-md">
											ENTER <AiOutlineEnter />
										</span>{" "}
										to go to next step
									</span>
								)}

								<button
									className="flex text-slate-300 bg-slate-600 px-2 py-[1px] rounded-md active:bg-slate-500"
									onClick={() => toNext()}
								>
									{status === "finished" ? "Publish" : "next"}
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default PublishModal;
