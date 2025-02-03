import { MdClose } from "react-icons/md";
import { TbSearch } from "react-icons/tb";

const SearchBar = ({
	isFocused,
	query,
	setQuery,
	setIsFocused,
	setIsSearching,
}) => {
	return (
		<div
			className={`flex items-center gap-2 cursor-default tracking-wide ${
				isFocused ? " md:w-1/3 border-slate-600" : "border-slate-800"
			} font-bold bg-slate-800 bg-opacity-65 border-[1px]  px-2 py-[5px] rounded-full transition-all duration-400`}
		>
			{query === "" ? (
				<TbSearch size={18} className="text-slate-400" />
			) : (
				<div
					className=" text-slate-400 bg-slate-700 rounded-full p-[1px] cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:text-color-3"
					onClick={() => setQuery("")}
				>
					<MdClose size={16} />
				</div>
			)}
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search here ..."
				className={`${
					!isFocused && query === " w-4 xs:w-12" ? "" : "w-[8rem] xs:w-full"
				} text-slate-400 bg-transparent border-none  outline-none placeholder:text-n-4 focus:border-slate-600 focus:text-slate-300 transition-all duration-300 text-ellipsis`}
				onFocus={() => {
					setIsFocused(true);
					setIsSearching(true);
				}}
			/>
		</div>
	);
};

export default SearchBar;
