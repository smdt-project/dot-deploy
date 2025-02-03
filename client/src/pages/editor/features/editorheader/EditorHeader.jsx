import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Account from "../../../../features/auth/Account";
import EditorMenu from "./EditorMenu";

const EditorLogo = () => {
	const navigateTo = useNavigate();

	return (
		<button className="cursor-pointer" onClick={() => navigateTo("/")}>
			<img src="/dot.svg" alt="" className="min-w-6 min-h-6 w-6 h-6 ml-2" />
		</button>
	);
};

const ProjectName = () => {
	const { project } = useSelector((state) => state.project);

	return (
		<div className="flex-grow flex items-center justify-center text-slate-300 font-bold font-sans">
			<span className=" w-1/2 line-clamp-1">
				{project.name.split(" ").join("-")}
			</span>
		</div>
	);
};

const EditorHeader = () => {
	const [show, setShow] = useState(true);

	return (
		<header className="flex items-center w-[100dvw] h-10 bg-[#3a404cfe] border-b-[1px] border-slate-500 pr-2">
			<EditorLogo />
			<EditorMenu show={show} setShow={setShow} />
			{show && (
				<>
					<ProjectName />
					<Account />
				</>
			)}
		</header>
	);
};

export default EditorHeader;
