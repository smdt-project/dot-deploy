import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const CommUserName = ({ handleClick, classes }) => {
	const { user, isUserSignedIn } = useSelector((state) => state.auth);

	return (
		<button
			className={`${classes} items-center gap-2 bg-slate-800 bg-opacity-60 text-slate-200 px-2 rounded-md transition-all duration-300 hover:text-slate-50 hover:bg-opacity-100 cursor-pointer w-[5.5rem] sm:w-content`}
			onClick={() => handleClick()}
		>
			<div>
				<CgProfile className="text-xl text-slate-400" />
			</div>
			<span className="line-clamp-1 text-ellipsis text-slate-200 font-sans font-semibold">
				{isUserSignedIn ? user.name : "Anonymous"}
			</span>
		</button>
	);
};

export default CommUserName;
