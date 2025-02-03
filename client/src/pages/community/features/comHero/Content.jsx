import { useEffect, useState } from "react";
import { BiCode, BiPaint } from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";
import { IoColorPalette } from "react-icons/io5";
import { MdHttp } from "react-icons/md";
import { PiFunction } from "react-icons/pi";
import { TbWorldCode, TbWorldQuestion } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openAnonymously } from "../../communitySlice";

const Content = () => {
	const [isBtnHovered, setIsBtnHovered] = useState(false);
	const [isBtn2Hovered, setIsBtn2Hovered] = useState(false);
	const [index, setIndex] = useState(0);
	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIndex(() => (index === 0 ? 1 : 0));
		}, 4000);
		return () => clearTimeout(timeout);
	}, [index]);

	const joinAnonymously = () => {
		dispatch(openAnonymously(true));
	};

	return (
		<div className="relative h-[80dvh] flex flex-col items-center justify-center gap-1 md:pl-20 pl-4 sm:px-10">
			<h1 className="sm:text-2xl md:text-3xl text-3xl md:max-w-xl font-semibold mb-6 text-slate-300 text-center flex flex-col gap-2">
				<span>
					Explore Community-made{" "}
					<span
						className={`${
							index === 0
								? "text-color-5 underline underline-offset-8"
								: "text-slate-400 no-underline"
						} cursor-default transition-all duration-300`}
						onMouseEnter={() => setIndex(0)}
					>
						Ui Components
					</span>
				</span>{" "}
				<span>
					and{" "}
					<span
						className={`${
							index
								? "text-color-5 underline underline-offset-8"
								: "text-slate-400"
						} cursor-default`}
						onMouseEnter={() => setIndex(1)}
					>
						Code Snippets
					</span>{" "}
					and more
				</span>
			</h1>

			<div className="flex items-center gap-2">
				<button
					className="sm:text-lg font-semibold flex items-center md:gap-4 sm:gap-2 gap-1 px-4 sm:px-6 py-2  shadow-sm rounded-l-full transition-all duration-300 bg-slate-800 border-slate-800 hover:border-slate-500 text-n-2 hover:text-color-5"
					onMouseEnter={() => setIsBtn2Hovered(true)}
					onMouseLeave={() => setIsBtn2Hovered(false)}
					onClick={() => navigateTo("/login")}
				>
					{isBtn2Hovered ? (
						<img src="/dot.svg" width={23} />
					) : (
						<span className="sm:text-[2rem] opacity-50">
							<TbWorldCode size={23} />
						</span>
					)}
					<span>Join community</span>
				</button>
				<button
					className="sm:text-lg font-semibold flex items-center md:gap-4 sm:gap-2 gap-1 px-4 sm:px-6 py-2  shadow-sm rounded-r-full transition-all duration-300 bg-slate-800 border-slate-800 hover:border-slate-500 text-n-2 hover:text-color-7"
					onMouseEnter={() => setIsBtnHovered(true)}
					onMouseLeave={() => setIsBtnHovered(false)}
					onClick={() => joinAnonymously()}
				>
					{isBtnHovered ? (
						<img src="/dot.svg" width={23} />
					) : (
						<span className="sm:text-[2rem] opacity-50">
							<TbWorldQuestion size={23} />
						</span>
					)}
					<span>Check it first</span>
				</button>
			</div>

			{index ? (
				<div className="absolute top-52 -z-10 flex justify-between w-2/3 text-slate-500 ">
					<div className="">
						<div className="flex gap-6 mb-10">
							<div className="rotate-12 ml-10 p-1 rounded-md border-2 border-slate-700">
								<BsDatabase size={30} className="" />
							</div>
							<div className="rotate-12 ml-10 p-1 rounded-md -translate-y-16 translate-x-7 border-2 border-slate-700">
								<BiCode size={30} className="" />
							</div>
						</div>
						<div className=" pt-10 pr-10">
							<div className="rotate-12 flex items-center gap-2 bg-n-13 border-2 border-slate-700 p-2 rounded-md">
								<div className="w-3 h-3 bg-color-1 rounded-full" />
								<div className="h-3 w-20 bg-color-1 rounded-full" />
							</div>
							<div className="rotate-12 translate-x-3 -translate-y-2 flex items-center gap-2 border-2 bg-n-13 border-slate-700 p-2 rounded-md">
								<div className="w-3 h-3 bg-color-3 rounded-full" />
								<div className="h-3 w-20 bg-color-3 rounded-full" />
							</div>
						</div>
					</div>
					<div className="">
						<div className="flex gap-6 mb-10">
							<div className="-rotate-12 p-1 rounded-md ml-10 -translate-y-16 -translate-x-7 border-2 border-slate-700">
								<MdHttp size={30} className="" />
							</div>
							<div className="-rotate-12 ml-10 p-1 rounded-md border-2 border-slate-700">
								<PiFunction size={30} />
							</div>
						</div>
						<div className=" pt-10 pr-10">
							<div className="-rotate-12 flex items-center gap-2 bg-n-13 border-2 border-slate-700 p-2 rounded-md">
								<div className="w-3 h-3 bg-color-4 rounded-sm rotate-45" />
								<div className="h-3 w-20 bg-color-4 rounded-full" />
							</div>
							<div className="-rotate-12 translate-x-3 -translate-y-2 flex flex-col items-center gap-2 border-2 bg-n-13 border-slate-700 p-2 rounded-md">
								<div className="flex items-center gap-2">
									<div className="w-1 h-1 bg-slate-500 rounded-full" />
									<div className="h-1 w-20 bg-color-1 rounded-full" />
								</div>
								<div className="flex items-center gap-5">
									<div className="w-1 h-1 bg-slate-500 rounded-full" />
									<div className="h-1 w-[4.3rem] bg-color-6 rounded-full" />
								</div>
								<div className="flex items-center gap-5">
									<div className="w-1 h-1 bg-slate-500 rounded-full" />
									<div className="h-1 w-[4.3rem] bg-color-2 rounded-full" />
								</div>
								<div className="flex items-center gap-2">
									<div className="w-1 h-1 bg-slate-500 rounded-full" />
									<div className="h-1 w-20 bg-color-1 rounded-full" />
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="absolute top-52 -z-10 flex justify-between w-2/3 text-slate-500 ">
					<div className="">
						<div className="flex gap-6 mb-10">
							<div className="rotate-12 ml-10 p-1 rounded-md border-2 border-slate-700">
								<IoColorPalette size={30} className="" />
							</div>
							<div className="rotate-12 ml-10 p-1 rounded-md -translate-y-16 translate-x-7 border-2 border-slate-700">
								<BiPaint size={30} className="" />
							</div>
						</div>
						<div className=" pt-10 pr-10">
							<div className="rotate-12 flex items-center gap-2 bg-n-13 border-2 border-slate-700 p-2 rounded-md">
								<div className="w-3 h-3 bg-color-1 rounded-full" />
								<div className="h-3 w-20 bg-color-1 rounded-full" />
							</div>
							<div className=" translate-x-3 -translate-y-2 flex flex-col gap-2 border-2 bg-n-13 border-slate-700 px-2 py-3 rounded-md scale-75">
								<div className="h-3 w-12 bg-slate-400 rounded-sm" />
								<div className="h-2 w-full bg-slate-500 rounded-sm" />
								<div className="h-2 w-full bg-slate-500 rounded-sm" />
								<div className="h-2 w-3/4 bg-slate-500 rounded-sm" />
								<div className="h-5 w-10 bg-color-3 rounded-md self-end mt-2" />
							</div>
						</div>
					</div>
					<div className="">
						<div className="flex gap-6 mb-10">
							<div className="-rotate-12 p-1 rounded-md ml-10 -translate-y-16 -translate-x-7 border-2 border-slate-700">
								<BiPaint size={30} className="" />
							</div>
							<div className="-rotate-12 ml-10 p-1 rounded-md border-2 border-slate-700">
								<IoColorPalette size={30} />
							</div>
						</div>
						<div className=" pt-10 pr-10">
							<div className="-rotate-12 flex items-center gap-2 bg-n-13 border-2 border-slate-700 p-2 rounded-md">
								<div className="w-3 h-3 bg-color-4 rounded-sm rotate-45" />
								<div className="h-3 w-20 bg-color-4 rounded-full" />
							</div>
							<div className="-rotate-12 translate-x-3 -translate-y-2 flex items-center gap-2 border-2 bg-n-13 border-slate-700 p-2 rounded-md">
								<div className="w-3 h-3 bg-color-3 rounded-full" />
								<div className="h-3 w-20 bg-color-3 rounded-full" />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Content;
