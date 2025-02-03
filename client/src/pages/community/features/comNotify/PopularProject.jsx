import { useEditorOpen } from "../../../../hooks/useEditorOpen";
import LngName from "../../../../ui/LngName";

const PopularProject = ({ project }) => {
	const openEditor = useEditorOpen();
	const isSnippet = project.type === "snippet";

	return (
		<div className="flex flex-col bg-slate-50 bg-opacity-10 border-[1px] border-slate-400 backdrop-blur-2xl rounded-md p-3 shadow-lg shadow-[#25122c7d]">
			<span className="text-slate-100 font-semibold tracking-wide">
				{project.name}
			</span>
			<span className="text-slate-300 text-sm font-sans">
				{project.description}
			</span>
			<div className="flex items-center gap-1 text-slate-300 py-1">
				<LngName name={project.lngName} isSnippet={isSnippet} />
			</div>
			<button
				className="self-start bg-slate-900 bg-opacity-50 text-slate-300 font-semibold text-sm px-3 py-1 rounded-full transition-all duration-300 hover:bg-opacity-80 hover:text-slate-50 hover:shadow-md hover:shadow-n-6 mt-3"
				onClick={() => openEditor("open", project.lngName, project)}
			>
				check code
			</button>
		</div>
	);
};

export default PopularProject;
