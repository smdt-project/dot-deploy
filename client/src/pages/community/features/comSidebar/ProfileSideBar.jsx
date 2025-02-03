import PPBox from "./PPBox";
import ProjectList from "./ProjectList";

const ProfileSideBar = () => {
	return (
		<div className="move-from-left absolute left-0 top-[4rem] h-[90dvh] w-64 flex sm:hidden flex-col gap-2 bg-slate-900 border-r-2 border-slate-800 px-5 pt-10">
			<PPBox />
			<ProjectList />
		</div>
	);
};

export default ProfileSideBar;
