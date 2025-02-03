import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import PostTab from "./PostTab";
import ProjectTab from "./ProjectTab";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import SnippetTab from "./SnippetTab";
import UiTab from "./UiTab";
import UserTab from "./UserTab";
import { searchRequest } from "./searchSlice";

const SearchQuery = ({ tag, setIsFocused, query }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="text-sm xs:text-md max-w-[91.4%] flex items-center gap-1 text-slate-500 overflow-hidden">
				<div>
					<IoIosArrowForward />
				</div>{" "}
				DotCode/search
				{tag === "ui" || tag === "snippet"
					? "/projects?"
					: tag === "all"
					? "?"
					: "/" + tag + "s?"}
				q= &apos;
				<span className=" text-green-300 line-clamp-1 max-w-[2rem] sm:max-w-[5rem]">
					{query}
				</span>
				&apos;{tag === "ui" || tag === "snippet" ? "&type=" + tag : ""}
			</div>

			<button
				className="p-1 m-2 self-end bg-slate-800 rounded-md text-slate-300 hover:bg-slate-700 transition-all duration-300 hover:text-slate-100 text-xl"
				onClick={() => setIsFocused(false)}
			>
				<MdClose />
			</button>
		</div>
	);
};

const Search = ({ setIsSearching }) => {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [isFocused, setIsFocused] = useState(false);
	const dispatch = useDispatch();

	const [tag, setTag] = useState("all");

	useEffect(() => {
		if (query.trim().length > 0) {
			dispatch(searchRequest({ tag: tag, query: query, page: page }));
		}
	}, [query, tag, page, dispatch]);

	useEffect(() => {
		if (query === "" && !isFocused) {
			setIsSearching(false);
		}
	}, [query, isFocused, setIsSearching]);

	const handleTagging = (newTag) => {
		if (tag === newTag) {
			setTag("all");
			setIsFocused(true);
		} else {
			setTag(newTag);
			setIsFocused(true);
		}
	};

	return (
		<div
			className={`relative md:px-1 ${
				isFocused ? "w-full" : ""
			} flex items-center justify-center`}
		>
			<SearchBar
				query={query}
				setQuery={setQuery}
				isFocused={isFocused}
				setIsFocused={setIsFocused}
				setIsSearching={setIsSearching}
			/>
			{isFocused && (
				<div className="fixed left-0 top-[4rem] flex items-start justify-center gap-2 w-[100dvw] h-[100dvh] backdrop-blur-[1rem] bg-n-13 bg-opacity-90">
					<div className="relative bg-slate-900 p-2 rounded-lg border-2 border-slate-800 flex flex-col gap-2 shadow-lg shadow-gray-900 w-[90%] sm:w-[96%] md:w-[48rem] min-h-[70.3dvh] backdrop-blur-[4px]">
						<SearchQuery query={query} tag={tag} setIsFocused={setIsFocused} />
						<SearchResults setIsSearching={setIsFocused} tag={tag} />
						<div className="flex items-center gap-1">
							<span className="text-slate-400 text-[14px]">Filters</span>
							<div className="h-[1px] flex flex-grow bg-slate-500" />
						</div>
						<div className="sm:relative  flex flex-col gap-2 backdrop-blur-2xl bg-n-13 px-2 sm:px-0">
							<div className="flex flex-col sm:flex-row gap-2">
								<ProjectTab tag={tag} handleTagging={handleTagging} />
								<div className="flex flex-col gap-2">
									<UiTab tag={tag} handleTagging={handleTagging} />
									<SnippetTab tag={tag} handleTagging={handleTagging} />
								</div>
							</div>
							<PostTab tag={tag} handleTagging={handleTagging} />
							<UserTab tag={tag} handleTagging={handleTagging} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
