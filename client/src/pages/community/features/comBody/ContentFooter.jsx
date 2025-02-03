import { NavLink } from "react-router-dom";
import { lastUpdate } from "../../../../utils/helpers";

const ContentFooter = ({ ownerId, ownerName, createdAt, updatedAt }) => {
	return (
		<div className="self-end flex items-center gap-2 pt-5">
			<span className="text-slate-300">#By: </span>
			<div className="flex flex-wrap gap-y-3 gap-x-2 px-2	">
				<NavLink
					to={`/profile/${ownerId}`}
					className="text-slate-300 text-sm bg-slate-700 bg-opacity-50 px-2 py-[1px] rounded-md transition-all duration-300 hover:bg-opacity-70 hover:underline hover:underline-offset-2"
				>
					{ownerName}
				</NavLink>
			</div>
			<span className="text-slate-400">{lastUpdate(createdAt, updatedAt)}</span>
		</div>
	);
};

export default ContentFooter;
