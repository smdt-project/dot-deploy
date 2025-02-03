import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { BiCheck, BiTrash } from "react-icons/bi";
import { ImShare } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../../../ui/Error";
import Loading from "../../../../ui/Loading";
import { getLngInfo } from "../../../../utils/helpers";
import { supportedLng } from "../../../../utils/supportedLng";
import {
	createPostRequest,
	resetPostStatus,
	updatePostRequest,
} from "./postSlice";

const TextContent = ({ content, index, deleteContent, updateContent }) => {
	const [value, setValue] = useState(content.value);

	useEffect(() => {
		updateContent(index, { value: value, type: "text", lngName: "" });
	}, [value, index]);

	return (
		<div className="flex flex-col gap-3 bg-slate-700 bg-opacity-30 px-4 py-2 rounded-md">
			<div className="flex items-center gap-3">
				<span className="text-slate-500">{content.type}</span>
				<button
					className="p-[3px] text-red-400 transition-all duration-300 hover:text-red-500"
					onClick={() => deleteContent(index)}
				>
					<BiTrash />
				</button>
			</div>
			<textarea
				type="text"
				className="flex-grow bg-transparent border-2 border-slate-600 px-2 py-1 placeholder:text-slate-500 placeholder:text-sm text-slate-200 text-semibold outline-none transition-all duration-300 focus:border-slate-500 rounded-md overflow-y-auto min-h-20 resize-y small-scroll mb-2"
				placeholder="Add content"
				value={value}
				onChange={(event) => setValue(event.target.value)}
				required
				autoFocus
			/>
		</div>
	);
};

const CodeContent = ({ content, deleteContent, index, updateContent }) => {
	const [code, setCode] = useState(content.value);
	const [isSelectingLng, setIsSelectingLng] = useState(false);
	const [selectedLng, setSelectedLng] = useState("js");

	const mode = getLngInfo(selectedLng).mode;

	useEffect(() => {
		const codeContent = { type: "code", value: code, lngName: selectedLng };
		updateContent(index, codeContent);
	}, [index, code, selectedLng, updateContent]);

	const selectLng = (lng) => {
		setSelectedLng(lng);
		setIsSelectingLng(false);
	};

	return (
		<div className="flex flex-col gap-3 bg-slate-700 bg-opacity-30 px-4 py-2 rounded-md">
			<div className=" flex items-start gap-3 justify-between w-full">
				<div className="flex items-center gap-3">
					<span className="text-slate-500">{content.type}</span>
					<button
						className="p-[3px] text-red-400 transition-all duration-300 hover:text-red-500"
						onClick={() => deleteContent(index)}
					>
						<BiTrash />
					</button>
				</div>
				<div className="relative">
					{isSelectingLng && (
						<div className="flex flex-col gap-1 absolute z-[100] top-9 right-0 bg-n-14 shadow-md shadow-n-13 rounded-md py-2 min-w-44 h-44 pr-2 overflow-x-hidden overflow-h-scroll small-scroll">
							{supportedLng.map((lng, index) => (
								<button
									className="flex items-center gpa-4 justify-between text-slate-300 font-semibold tracking-wide font-code transition-all duration-300 hover:bg-slate-700 hover:bg-opacity-60 hover:text-slate-50 px-3 py-1"
									onClick={() => selectLng(lng.lngName)}
									key={index}
								>
									<div className="flex items-center gap-3">
										{lng.icon}
										<span>{lng.lngName}</span>
									</div>
									{lng.lngName === selectedLng && <BiCheck />}
								</button>
							))}
						</div>
					)}
					<button
						className="flex items-center gap-1 text-slate-00 text-state-300 bg-slate-600 bg-opacity-55 px-3 py-[3px] rounded-md transition-all duration-0 hover:bg-opacity-80"
						onClick={() => setIsSelectingLng((is) => !is)}
					>
						<span>{selectedLng}</span>
						{isSelectingLng ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</button>
				</div>
			</div>
			<div className="p-1 bg-n-14 rounded-md min-h-20">
				<CodeMirror
					value={code}
					height={"100%"}
					width={"100%"}
					theme={"dark"}
					extensions={[mode, EditorView.lineWrapping]}
					basicSetup={{
						tabSize: 4,
						mode: mode,
						syntaxHighlighting: true,
					}}
					style={{
						fontSize: "20px",
						paddingLeft: "1rem",
						paddingRight: "1rem",
					}}
					onChange={(value) => setCode(value)}
					autoFocus
				/>
			</div>
		</div>
	);
};

const classes =
	"text-slate-300 bg-slate-700 bg-opacity-70 px-2 py-[2px] font-semibold rounded-sm transition-all duration-300 hover:bg-slate-400 hover:bg-opacity-40 active:bg-slate-400 active:text-slate-950 capitalize";

const PostModal = ({ setIsPosting, isUpdating, post, setIsEditing }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const { isLoading, error } = useSelector((state) => state.post);

	const [title, setTitle] = useState(isUpdating ? post.title : "");
	const [description, setDescription] = useState(
		isUpdating ? post.description : ""
	);
	const [contents, setContents] = useState(isUpdating ? post.contents : []);
	const [contentIndex, setContentIndex] = useState(0);

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const addContent = (type) => {
		if (contents.length > 0) {
			let con;
			const cons = [];
			contents.forEach((content) => {
				if (content.value === "") {
					con = content;
				} else {
					cons.push(content);
				}
			});

			if (!con) {
				setContents((contents) => [...contents, { type: type, value: "" }]);
			} else {
				if (con.type !== type) {
					cons.push({ type: type, value: "" });
					setContents(cons);
				}
			}
		} else {
			setContents((contents) => [...contents, { type: type, value: "" }]);
		}
	};

	const deleteContent = (delIndex) => {
		setContents((contents) =>
			contents.filter((contents, index) => index !== delIndex)
		);
	};

	const updateContent = (updIndex, newValue) => {
		let updatedContents = [];
		contents.forEach((content, index) => {
			if (index === updIndex) {
				const updContent = {
					...content,
					value: newValue.value,
					lngName: newValue.lngName,
				};
				updatedContents.push(updContent);
			} else {
				updatedContents.push(content);
			}
		});

		setContents((contents) => updatedContents);
	};

	const handleClose = () => {
		if (isUpdating) {
			setIsEditing(false);
		} else {
			setIsPosting(false);
		}
	};

	const createPost = (newPost) => {
		dispatch(createPostRequest(newPost));
	};
	const updatePost = (newPost) => {
		dispatch(updatePostRequest({ data: newPost, id: post._id }));
	};

	const handleSubmit = () => {
		if (isUserSignedIn) {
			const newPost = {
				title: title,
				description: description,
				contents: contents.filter((con) => con.value.trim() !== ""),
				owner: user.userId,
			};
			isUpdating ? updatePost(newPost) : createPost(newPost);
		} else {
			navigateTo("/login");
		}
	};

	return (
		<div className="absolute left-0 top-0 z-[999] w-[100dvw] h-[99dvh] backdrop-blur-sm flex items-start justify-center py-5">
			<div className="min-w-[95%] sm:min-w-[80%] sd:min-w-[70%] d:min-w-[50%] flex flex-col gap-2 p-5 mt-1 bg-slate-800 rounded-lg border-2 border-slate-700 shadow-lg shadow-n-7 ">
				<div className="flex items-center justify-between gap-2 text-slate-300 font-bold text-lg pb-2">
					<div className="flex items-center gap-2">
						<ImShare size={17} />
						<span>{isLoading ? "Posting ..." : "Share something"}</span>
					</div>
					<button
						className="bg-slate-700 p-[2px] bg-opacity-70 text-slate-400 rounded-md transition-all duration-300 hover:text-slate-300 hover:bg-opacity-100"
						onClick={() => handleClose()}
					>
						<MdClose />
					</button>
				</div>
				{!isLoading && !error && (
					<>
						<div className="max-h-[70dvh] flex flex-col gap-4 pr-2 overflow-y-scroll small-scroll">
							<div className="flex flex-col gap-1 bg-slate-700 px-1 rounded-md py-1 bg-opacity-30 border-l-4 border-slate-700">
								<span className="text-slate-400">
									Title{" "}
									<span
										className={`${
											title.length > 0 ? "text-color-4" : "text-red-500"
										} text-lg`}
									>
										*
									</span>
								</span>
								<input
									type="text"
									className="bg-transparent border-b-2 border-slate-700 px-2 py-1 placeholder:text-slate-500 placeholder:text-sm text-slate-200 text-semibold outline-none transition-all duration-300 focus:border-slate-500 sm:min-h-10 min-h-8"
									placeholder="Give you post title"
									value={title}
									onChange={(event) => setTitle(event.target.value)}
									required
								/>
							</div>
							<div className="flex flex-col bg-slate-700 px-1 rounded-md py-1 bg-opacity-30 border-l-4 border-slate-700">
								<span className="text-slate-400">
									Description{" "}
									<span
										className={`${
											description.length > 0 ? "text-color-4" : "text-red-500"
										} text-lg`}
									>
										*
									</span>
								</span>
								<input
									type="text"
									className="border-b-2 border-slate-700 bg-transparent px-2 py-1 placeholder:text-slate-500 placeholder:text-sm text-slate-200 text-semibold outline-none transition-all duration-300 focus:border-slate-500 small-scroll "
									placeholder="Add description for your post"
									value={description}
									onChange={(event) => setDescription(event.target.value)}
									required
								/>
							</div>
							{contents.map((content, index) =>
								content.type === "text" ? (
									<TextContent
										key={index}
										content={content}
										deleteContent={deleteContent}
										updateContent={updateContent}
										index={index}
									/>
								) : (
									<CodeContent
										key={index}
										content={content}
										deleteContent={deleteContent}
										updateContent={updateContent}
										index={index}
									/>
								)
							)}
						</div>

						<div className=" flex items-center gap-2 py-4">
							<span className="text-slate-400">Add contents</span>
							<div className="flex items-center gap-1">
								<button
									className={`${classes} ${
										contentIndex === 1 ? "border-slate-500" : "border-slate-700"
									}`}
									onClick={() => addContent("text")}
								>
									Text
								</button>
								<button
									className={`${classes} ${
										contentIndex === 2 ? "border-slate-500" : "border-slate-700"
									}`}
									onClick={() => addContent("code")}
								>
									Code
								</button>
							</div>
						</div>
						<div className="flex items-center justify-end gap-2">
							<button
								className={
									" text-slate-400 tracking-wide font-semibold md:py-1 py-[2px] md:px-4 px-2 rounded-md transition-all duration-300 hover:bg-opacity-100 hover:text-slate-200 capitalize"
								}
								onClick={() => handleClose()}
							>
								Cancel
							</button>
							<button
								className={`${
									title.length === 0 || description.length === 0
										? "bg-opacity-15"
										: "bg-opacity-40 hover:bg-opacity-100"
								} bg-color-5 text-slate-200 tracking-wide font-semibold md:py-1 py-[2px] md:px-4 px-2 rounded-full transition-all duration-300 capitalize`}
								onClick={() =>
									title.length > 0 && description.length > 0
										? handleSubmit()
										: {}
								}
							>
								Submit
							</button>
						</div>
					</>
				)}
				{isLoading && (
					<div className="flex-grow flex items-center justify-center h-[50dvh]">
						<Loading message={"Uploading post ..."} />
					</div>
				)}
				{error && (
					<div className="flex-grow flex flex-col gap-5 items-center justify-center h-[50dvh]">
						<Error message={error} tryAgain={() => handleSubmit()} />
						<button
							className="text-color-5 hover:underline hover:underline-offset-2"
							onClick={() => dispatch(resetPostStatus())}
						>
							back
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default PostModal;
