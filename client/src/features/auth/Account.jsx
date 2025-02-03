import { useState } from "react";
import { BiCodeBlock } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { TbLogout, TbUser, TbUserQuestion, TbWorldCode } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { calcDayDifference } from "../../utils/helpers";
import { logOutRequest } from "./authSlice";

const Account = () => {
	const navigateTo = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const [isOpened, setIsOpened] = useState(false);
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const loginDate = user ? calcDayDifference(Date.now(), user.loginAt) : "";

	const handleLogOut = () => {
		dispatch(logOutRequest());
		setIsOpened(false);
	};

	return (
		<div className="relative">
			{isUserSignedIn ? (
				<div
					className="flex items-center gap-2 sm:bg-slate-700 sm:px-2 py-1 rounded-md sm:bg-opacity-60 transition-all duration-300 hover:bg-opacity-100 cursor-pointer text-slate-300 font-semibold hover:text-slate-50"
					onClick={() => setIsOpened(true)}
				>
					{user.avatarUrl ? (
						<img
							src={user.avatarUrl}
							alt=""
							className={`min-w-6 min-h-6 w-6 h-6 self-start rounded-full border-[1px] border-color-5`}
						/>
					) : (
						<div
							className={`flex items-center justify-center min-w-6 min-h-6 w-6 h-6 self-start rounded-full border-[1px] border-color-5 bg-color-7 text-slate-950 text-2xl font-normal`}
						>
							{user.name[0]}
						</div>
					)}
					<span className="hidden sm:flex md:flex sm:max-w-44 sm:line-clamp-1 md:max-w-44 md:line-clamp-1">
						{user.name}
					</span>
				</div>
			) : (
				<div
					className=" bg-slate-700 px-2 py-[7px] rounded-full bg-opacity-60 transition-all duration-300 hover:bg-opacity-100 cursor-pointer text-slate-300 font-semibold hover:text-slate-50 text-[17px] sm:text-[20px]"
					onClick={() => navigateTo("/login")}
				>
					<TbUserQuestion />
				</div>
			)}
			{isOpened && (
				<div className="min-w-[20rem] absolute z-30 right-0 top-0 bg-slate-800 p-4 rounded-md flex flex-col gap-3 shadow-lg shadow-zinc-950">
					<div className="flex items-center gap-4 justify-between">
						<div className="flex items-center gap-2 px-2 py-1 rounded-md">
							<img src="/dot.svg" alt="" className="w-10" />
							<span className="text-slate-300 font-sns">{user.name}</span>
						</div>
						<button
							className="text-lg text-slate-400 bg-slate-700 p-1 rounded-md bg-opacity-60 transition-all duration-300 hover:bg-opacity-100 hover:text-slate-50"
							onClick={() => setIsOpened(false)}
						>
							<MdClose />
						</button>
					</div>
					<div className="flex flex-col gap-1 border-t-2 border-slate-700 pt-1">
						<div className="flex flex-col gap-3 pt-2">
							<button
								className="flex items-center gap-2 text-sm font-semibold text-slate-300 bg-slate-700 bg-opacity-50 transition-all duration-300 hover:bg-opacity-100 hover:text-color-5 px-2 p-1 capitalize"
								onClick={() => navigateTo(`/profile/${user.userId}`)}
							>
								<div>
									<TbUser size={18} />
								</div>
								<span>My profile</span>
							</button>
							{!pathname.includes("editor") && (
								<button
									className="flex items-center gap-2 text-sm font-semibold text-slate-300 bg-slate-700 bg-opacity-50 transition-all duration-300 hover:bg-opacity-100 hover:text-green-500 px-2 p-1 capitalize"
									onClick={() => navigateTo("/editor/code")}
								>
									<div>
										<BiCodeBlock size={18} />
									</div>
									<span>Editor</span>
								</button>
							)}
							{!pathname.includes("community") && (
								<button
									className="flex items-center gap-2 text-sm font-semibold text-slate-300 bg-slate-700 bg-opacity-50 transition-all duration-300 hover:bg-opacity-100 hover:text-blue-500 px-2 p-1 capitalize"
									onClick={() => navigateTo("/community")}
								>
									<div>
										<TbWorldCode size={18} />
									</div>
									<span>Community</span>
								</button>
							)}
							<button
								className="flex items-center gap-2 text-sm font-semibold text-slate-300 bg-slate-700 bg-opacity-50 transition-all duration-300 hover:bg-opacity-100 hover:text-red-500 px-2 p-1 capitalize"
								onClick={() => handleLogOut()}
							>
								<div>
									<TbLogout size={18} />
								</div>
								<span>Log out</span>
							</button>
						</div>
						<span className="flex-grow mt-5 text-sm text-slate-400 pt-[2px] text-end border-t-2 border-slate-700">
							Logged in {loginDate}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Account;
