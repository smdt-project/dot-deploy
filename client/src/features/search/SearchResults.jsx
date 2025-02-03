import { useSelector } from "react-redux";
import Loading from "../../ui/Loading";
import PostCard from "../../ui/PostCard";
import ProjectCard from "../../ui/ProjectCard";
import UserCard from "../../ui/UserCard";

const SearchResults = ({ setIsSearching }) => {
	const { projects, users, posts, isLoading, error } = useSelector(
		(state) => state.search
	);
	const totalResults = projects.length + posts.length + users.length;

	return (
		<>
			{!isLoading && !error && (
				<>
					{totalResults > 0 ? (
						<div className="flex flex-col gap-2 flex-grow ">
							<div className="flex items-center gap-1">
								<span className="text-slate-400 text-[14px]">
									Results {`(${totalResults})`}
								</span>
								<div className="h-[1px] flex flex-grow bg-slate-500" />
							</div>
							<div className="flex flex-col gap-2 max-h-[73dvh] sm:max-h-[33dvh] md:max-h-[39dvh] overflow-y-scroll overflow-x-hidden small-scroll pr-2">
								{projects && (
									<div className="flex flex-col gap-2">
										{projects.map((project, index) => (
											<ProjectCard
												key={index}
												setIsSearching={setIsSearching}
												project={project}
											/>
										))}
									</div>
								)}
								{posts && (
									<div className="flex flex-wrap gap-2">
										{posts.map((post, index) => (
											<PostCard key={index} post={post} />
										))}
									</div>
								)}
								{users && (
									<div className="flex flex-col gap-2">
										{users.map((user, index) => (
											<UserCard key={index} user={user} />
										))}
									</div>
								)}
							</div>
						</div>
					) : (
						<div className=" flex-grow flex flex-col sm:items-center sm:justify-center bg-opacity-35 rounded-md text-center px-2 py-1 text-wrap">
							<span className="text-red-300 font-bold sm:text-lg">
								No result found{" "}
							</span>
							<span className="text-slate-400">
								try again with titles, descriptions, tags, user names, ...
							</span>
						</div>
					)}
				</>
			)}
			{isLoading && (
				<div className=" flex-grow flex flex-col sm:items-center sm:justify-center bg-opacity-35 rounded-md text-center px-2 py-1 text-wrap">
					<Loading message={"searching..."} />
				</div>
			)}
			{error && (
				<div className=" flex-grow flex flex-col sm:items-center sm:justify-center bg-opacity-35 rounded-md text-center px-2 py-1 text-wrap">
					<span className="text-wrap text-red-500 font-semibold tracking-wide">
						{error}
					</span>
				</div>
			)}
		</>
	);
};

export default SearchResults;
