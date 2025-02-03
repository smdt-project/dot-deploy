import { Outlet } from "react-router-dom";
import EditorFooter from "./EditorFooter";
import EditorHeader from "./features/editorheader/EditorHeader";
import EditorSidebar from "./features/sidebar/EditorSidebar";

const EditorPage = () => {
	return (
		<div className="relative flex-col transition-all duration-500">
			<EditorHeader />
			<div className="flex h-[92dvh]">
				<EditorSidebar />
				<Outlet />
			</div>
			<EditorFooter />
		</div>
	);
};

export default EditorPage;
