import { TbNotification } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	handleCreatingModal,
	resetCreatingModal,
	setNewProject,
} from "../../../editor/editorSlice";
import Footer from "../../../home/features/footer/Footer";
import Background from "../../../home/features/hero/Background";
import Content from "./Content";

const Notification = () => {
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const open = (type, lngName) => {
		dispatch(resetCreatingModal());
		dispatch(setNewProject({ type, lngName }));
		dispatch(handleCreatingModal(true));
		navigateTo("/editor/code");
	};

	return (
		<div className="flex flex-wrap items-center gap-3 justify-between px-10 py-5 mx-10 md:mx-32 bg-n-5 bg-opacity-50 rounded-lg border-[1px] border-slate-700">
			<div className="flex flex-wrap gap-3">
				<TbNotification size={23} className="text-slate-300" />
				<span className="flex items-center font-semibold text-lg text-slate-300">
					New features in{" "}
					<img src="/dot.svg" alt="" width={20} className="mx-1" />
					{" editor"}
				</span>
			</div>
			<div className="flex-grow flex flex-wrap items-center justify-between gap-2">
				<span className="text-slate-400">
					check out new updates on DotCode editor
				</span>
				<button
					className=" px-4 py-2 bg-slate-700 rounded-full text-slate-300 transition-all duration-300 hover:text-slate-100 hover:bg-slate-600"
					onClick={() => open("ui", "html")}
				>
					try for free
				</button>
			</div>
		</div>
	);
};

const CommunityHero = () => {
	return (
		<section
			id="top"
			className="relative overflow-hidden h-[100dvh] overflow-y-scroll overflow-x-hidden small-scroll"
		>
			<Background />
			<div className="flex flex-col">
				<Content />
				<Notification />
			</div>
			<Footer />
		</section>
	);
};

export default CommunityHero;
