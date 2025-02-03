import { LuComponent } from "react-icons/lu";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEditorOpen } from "../../../../hooks/useEditorOpen";
import LngName from "../../../../ui/LngName";

const Project = ({ project }) => {
	const isSnippet = project.type == "snippet";
	const openEditor = useEditorOpen();

	const handleClick = () =>
		openEditor("open", project.lngName, {
			...project,
			owner: { _id: project.owner },
		});

	return (
		<button
			className={`min-w-40 flex flex-col gap-2 bg-slate-800 border-2 border-slate-700 p-2 rounded-md transition-all duration-300 hover:bg-slate-700 cursor-pointer text-slate-400`}
			onClick={() => handleClick()}
		>
			<span className="flex items-center  gap-1 text-slate-100">
				<LuComponent />
				<span className="font-semibold line-clamp-1">{project.name}</span>
			</span>
			<span className="text-sm font-thin text-slate-300 line-clamp-2">
				{project.description}
			</span>
			<div className="flex items-center gap-1">
				<LngName name={project.lngName} isSnippet={isSnippet} />
			</div>
		</button>
	);
};

const DetailProjectList = ({ projects, ownerId, isProject }) => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const isLoggedInUser = isUserSignedIn && user.userId === ownerId;
	return (
		<div className="w-full relative flex sd:flex-col gap-3">
			<div className="absolute left-0 bottom-0 w-10 sd:w-full h-full sd:h-10 bg-gradient-to-r sd:bg-gradient-to-t from-n-13 via-transparent to-transparent" />
			{projects && projects.length > 0 ? (
				<div className="w-full sd:h-[79dvh] flex flex-row sd:flex-col gap-3 overflow-y-scroll overscroll-x-auto sd:overflow-x-scroll code-area px-3 mt-3">
					{projects.map((project, i) => (
						<Project project={{ ...project, owner: ownerId }} key={i} />
					))}
				</div>
			) : (
				<div className=" px-10 p-5 bg-slate-800 bg-opacity-50 flex flex-col items-center justify-center gap-3 overflow-x-scroll code-area">
					{isLoggedInUser ? (
						<>
							<span className="text-slate-300 text-lg text-center">
								You have no projects yet, create, manage and share to the
								community.
							</span>
							<NavLink
								className="text-slate-300 bg-slate-700 bg-opacity-60 px-4 py-2 rounded-full transition-all duration-300 hover:text-slate-50 hover:bg-opacity-80"
								to={"/editor/dotcode"}
							>
								Open to editor
							</NavLink>
						</>
					) : (
						<>
							<span className="text-slate-300 font-semibold">
								User has no other projects yet.
							</span>
						</>
					)}
				</div>
			)}
			<div className="absolute right-0 top-0 w-10 sd:w-full h-full sd:h-10 bg-gradient-to-l sd:bg-gradient-to-b from-n-13 via-transparent to-transparent" />
		</div>
	);
};

export default DetailProjectList;
