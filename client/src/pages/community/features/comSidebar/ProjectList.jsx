import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDataRequest } from "../../../../features/auth/authSlice";
import { useEditorOpen } from "../../../../hooks/useEditorOpen";
import Error from "../../../../ui/Error";
import Loading from "../../../../ui/Loading";
import { openSidebar } from "../../communitySlice";

const ProjectList = () => {
	const { isUserSignedIn, userData, isLoading, user } = useSelector(
		(state) => state.auth
	);
	const { hasChange } = useSelector((state) => state.community);

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const projects = userData ? userData.projects : [];
	const posts = userData ? userData.posts : [];
	const userThings = [...projects, ...posts].sort((a, b) => {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});

	useEditorOpen(() => {
		fetchListAgain();
	}, [hasChange]);

	const fetchListAgain = () => dispatch(userDataRequest());

	const openProject = (pro) => {
		dispatch(openSidebar(false));
		navigateTo(
			`/community/${pro.lngName ? `project/${pro._id}` : `post/${pro._id}`}`
		);
	};

	return (
		<>
			{isUserSignedIn ? (
				userData ? (
					userThings.length > 0 ? (
						<div className=" w-full flex flex-col gap-2 mt-3 pr-1 h-[73dvh] overflow-x-hidden overflow-y-scroll small-scroll">
							{userThings.map((thing, i) => (
								<div
									key={i}
									className="flex items-center gap-1 px-2 py-1 bg-slate-800 bg-opacity-50 rounded-md cursor-pointer transition-all duration-300 hover:bg-opacity-100 text-slate-300 hover:text-slate-200 "
									onClick={() => openProject(thing)}
								>
									<div className="flex items-center gap-3 w-6 min-w-6 overflow-hidden border-2 border-slate-800 rounded-full">
										<img
											src={user.avatarUrl}
											alt=""
											width={"100%"}
											height={"100%"}
										/>
									</div>
									<span className="text-sm line-clamp-1">
										<span className="text-[14px] text-slate-400">
											{user.name}{" "}
										</span>
										<span className="text-[13px] ">
											/ {thing.lngName ? thing.name : thing.title}
										</span>
									</span>
								</div>
							))}
						</div>
					) : (
						<div className="flex-grow text-center text-slate-400 mt-40">
							Your have no projects or posts, just use the above{" "}
							<span className="text-color-5 font-bold">new</span> button to
							create new project or to share something👍🏻
						</div>
					)
				) : (
					<div className="flex-grow text-center text-slate-400 mt-40">
						{isLoading ? (
							<Loading message={"Fetching data..."} />
						) : (
							<Error
								message={"Your data has not been fetched"}
								tryAgain={fetchListAgain}
							/>
						)}
					</div>
				)
			) : (
				<div className="flex-grow text-center text-slate-400 mt-40">
					Your project and posts will be listed here when you join for real,
					just{" "}
					<span
						className="text-color-1 font-bold hover:underline hover:underline-offset-2 cursor-pointer"
						onClick={() => navigateTo("/login")}
					>
						login
					</span>{" "}
					or use the above <span className="text-color-5 font-bold">new</span>{" "}
					button to create new project👍🏻
				</div>
			)}
		</>
	);
};

export default ProjectList;
