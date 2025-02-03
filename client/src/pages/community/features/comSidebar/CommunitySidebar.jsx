import PPBox from "./PPBox";
import ProjectList from "./ProjectList";

const CommunitySidebar = () => {
	return (
		<div className="h-full min-w-64 w-64 hidden sm:flex flex-col gap-2 bg-slate-900 bg-opacity-70 border-r-2 border-slate-800 px-5 pt-8">
			<PPBox />
			<ProjectList />
		</div>
	);
};

export default CommunitySidebar;
