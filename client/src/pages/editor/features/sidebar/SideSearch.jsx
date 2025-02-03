import { LuSearchCode, LuSearchX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchQuery } from "../../editorSlice";

const SideSearch = () => {
	const { searchPanel } = useSelector((state) => state.editor);
	const dispatch = useDispatch();

	// const isOpened = () => {
	// 	return document.querySelector(`.cm-panels`) !== null;
	// };

	const handleSearch = () => dispatch(updateSearchQuery());

	return (
		<div className="min-w-56 flex flex-col gap-3 py-2 text-slate-500">
			<button
				className="self-start flex items-center justify-center py-[2px] gap-1 border-none outline-none text-slate-300 bg-color-5 bg-opacity-40 rounded-full mx-3 font-semibold placeholder:font-normal px-4 transition-all duration-300 hover:bg-opacity-70 hover:text-slate-50"
				onClick={() => handleSearch()}
			>
				{searchPanel ? <LuSearchX /> : <LuSearchCode />}
				<span> {searchPanel ? "Close search panel" : "Open search panel"}</span>
			</button>
			<div className="flex flex-col items-start gap-2 mx-3 border-t-2 border-slate-600">
				<span>you can use shortcuts, to:</span>
				<div className="flex items-center gap-1 px-3">
					<span className="hidden md:flex items-center gap-1 ">
						<span className="font-bold text-slate-400">Open</span>
					</span>
					<span className="self-end text-slate-300 bg-slate-600 bg-opacity-40 px-2 py-[1px] rounded-md">
						Ctrl + f
					</span>{" "}
				</div>
				<div className="flex items-center gap-1 px-3">
					<span className="hidden md:flex items-center gap-1 ">
						<span className="font-bold text-slate-400">Close</span>
					</span>
					<span className="self-end text-slate-300 bg-slate-600 bg-opacity-40 px-2 py-[1px] rounded-md">
						esc
					</span>
				</div>
			</div>
		</div>
	);
};

export default SideSearch;
