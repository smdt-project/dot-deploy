import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommUserName from "../../CommUserName";
import CreateNewBox from "../../CreateNewBox";
import { openSidebar } from "../../communitySlice";

const PPBox = () => {
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const handlePP = () => {
		if (isUserSignedIn) {
			navigateTo(`/profile/${user.userId}`);
		} else {
			navigateTo("/login");
		}
	};

	const handleClose = () => dispatch(openSidebar(false));

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center w-full justify-between">
				<CommUserName handleClick={handlePP} classes={"flex py-1 mb-2"} />
				<div className="hidden sm:flex">
					<CreateNewBox />
				</div>
				<button
					className="flex mb-1 sm:hidden bg-slate-800 p-1 rounded-full"
					onClick={() => handleClose()}
				>
					<MdClose />
				</button>
			</div>
			<span className="text-slate-300 text-sm font-semibold tracking-wide font-sans">
				Your works
			</span>
		</div>
	);
};

export default PPBox;
