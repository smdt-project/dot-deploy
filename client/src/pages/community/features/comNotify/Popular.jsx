import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEditorOpen } from "../../../../hooks/useEditorOpen";
import PopularProject from "./PopularProject";

const Popular = () => {
	const { topProjects } = useSelector((state) => state.community);
	const openEditor = useEditorOpen();
	const hasTop = topProjects.length > 0;

	return (
		<div className="flex-grow flex flex-col gap-3 p-5 bg-slate-900 border-2 border-slate-700 rounded-md w-full bg-[url('/assets/gradient2.svg')] bg-cover h-fit">
			<div className="flex items-center justify-between w-full">
				<span className="text-slate-400 text-sm font-sans">Most Starred</span>{" "}
				<button className="text-lg text-slate-400 transition-all duration-300 hover:text-slate-300">
					<MdClose />
				</button>
			</div>
			{hasTop ? (
				<div className="flex flex-col gap-3">
					{topProjects.map((project, index) => (
						<PopularProject key={index} project={project} />
					))}
				</div>
			) : (
				<div className="flex flex-col gap-3">
					<span>No project is found, new community 🥴</span>
					<button
						className="text-color-5 hover:underline"
						onClick={() => openEditor("ui", "html")}
					>
						Create new project
					</button>
				</div>
			)}
		</div>
	);
};

export default Popular;
