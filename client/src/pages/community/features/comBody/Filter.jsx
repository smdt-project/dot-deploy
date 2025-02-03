import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { IoFilter, IoReload } from "react-icons/io5";
import { MdArrowDownward } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getDataRequest } from "../../communitySlice";

const FilterBox = () => {
	const [selectedValue, setSelectedValue] = useState("all");
	const [isSelecting, setIsSelecting] = useState(false);

	const handleSelecting = (field) => {
		setSelectedValue(field);
		setIsSelecting(false);
	};

	return (
		<div
			className={`relative flex flex-col rounded-lg pb-1`}
			onMouseEnter={() => setIsSelecting(true)}
			onMouseLeave={() => setIsSelecting(false)}
		>
			<div
				className={`flex items-center gap-2 bg-slate-800 border-2 px-2 py-1 text-sm rounded-md font-sans font-semibold transition-all duration-300 cursor-default ${
					isSelecting
						? " text-slate-300 border-slate-700"
						: "text-slate-400 border-slate-800 hover:text-slate-300 hover:border-slate-700 "
				}`}
			>
				<div className="flex items-center gap-1">
					<IoFilter />
					<span>Filter</span>
				</div>
				{isSelecting ? <MdArrowDownward /> : <IoIosArrowDown />}
			</div>

			{isSelecting && (
				<div className="absolute top-[2.2rem] right-0 w-64 flex flex-col gap-1 bg-slate-900 rounded-lg border-2 border-slate-700 py-2 px-2">
					{[
						"all",
						"Components html, css & js",
						"Database snippets",
						"Http snippets",
						"Block Snippets",
						"Ui Snippets",
					].map((field, index) => (
						<span
							className={`flex items-center justify-between  px-3 py-1 text-center rounded-sm transition-all duration-300 hover:bg-gray-800 hover:text-slate-200 cursor-pointer ${
								selectedValue === field
									? "bg-gray-800 text-slate-300"
									: "bg-slate-800 text-slate-400 bg-opacity-30"
							}`}
							key={index}
							onClick={() => handleSelecting(field)}
						>
							<span>{field}</span>
							{selectedValue === field && <GiCheckMark />}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

const Filter = () => {
	const dispatch = useDispatch();
	const reloadData = () => dispatch(getDataRequest());

	return (
		<div className="flex items-start gap-3">
			<button
				className="pb-1 bg-slate-800 bg-opacity-50 p-2 text-lg rounded-md transition-all duration-300 text-slate-300 hover:text-slate-100 hover:bg-opacity-100 active:bg-color-7"
				onClick={() => reloadData()}
			>
				<IoReload />
			</button>
			<FilterBox />
		</div>
	);
};

export default Filter;
