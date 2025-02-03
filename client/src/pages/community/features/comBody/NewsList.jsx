import { useSelector } from "react-redux";
import CommunityNotification from "../comNotify/CommunityNotification";
import NewsFooter from "./NewsFooter";
import PostNewsTab from "./PostNewsTab";
import ProjectNewsTab from "./ProjectNewsTab";

const NewsList = () => {
	const { latests } = useSelector((state) => state.community);
	const hasNews = latests.length > 0;

	return (
		<div className="h-full flex flex-col justify-between mt-3 pr-3 overflow-x-hidden overflow-y-scroll small-scroll">
			{hasNews ? (
				<div className="flex flex-col gap-3 font-sans">
					{latests.map((news, index) =>
						news.lngName !== undefined ? (
							<ProjectNewsTab key={index} project={news} />
						) : (
							<PostNewsTab key={index} post={news} />
						)
					)}
					<button className="bg-slate-900 bg-opacity-70 border-[1px] border-slate-800 rounded-md p-2 mt-3 transition-all duration-300 hover:bg-opacity-100 text-slate-400 hover:text-slate-200">
						more
					</button>
				</div>
			) : (
				<div className="flex-grow w-full flex flex-col items-center justify-center text-slate-300 border-y-2 border-color-5">
					<span>Interestingly their is no new thing! new community🥴</span>
					<span>be the first to contribute!</span>
				</div>
			)}
			<CommunityNotification
				classes={
					"flex w-full sd:hidden sd:flex pt-2 sd:flex flex-col gap-10 border-t-[1px] border-slate-800 mt-10"
				}
			/>
			<NewsFooter />
		</div>
	);
};

export default NewsList;
