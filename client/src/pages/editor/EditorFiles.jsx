import { sampleProjects } from "../../utils/sampleProjects";

const project = sampleProjects[0];

const ProjectFile = ({ file }) => {
	return <span>{file.fileName}</span>;
};

const EditorFiles = () => {
	return (
		<div className="w-52 text-[11px] text-n-3 px-3 py-3 bg-slate-800">
			<span className=" line-clamp-1 w-3/4 uppercase">{project.name}</span>
			<div className="flex-col">
				{project.files.map((file, index) => (
					<ProjectFile key={index} file={file} />
				))}
			</div>
		</div>
	);
};

export default EditorFiles;
