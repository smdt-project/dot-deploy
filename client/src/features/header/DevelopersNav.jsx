import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowDownward } from "react-icons/md";

const DevelopersNav = () => {
	const [isUiHovered, setIsUiHovered] = useState(false);
	const [isHovered1, setIsHovered1] = useState(false);
	const [isHovered3, setIsHovered3] = useState(false);
	const [isHovered4, setIsHovered4] = useState(false);

	useGSAP(() => {
		gsap.fromTo(
			"#snippetNav",
			{ opacity: 0.6, y: -4 },
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
			}
		);
	}, [isUiHovered]);

	return (
		<div
			className={`relative md:px-1 flex items-center justify-center`}
			onMouseEnter={() => setIsUiHovered(true)}
			onMouseLeave={() => setIsUiHovered(false)}
		>
			<div
				className={`flex items-center gap-2 h-14 cursor-default tracking-wide ${
					isUiHovered ? "text-n-1" : "text-n-3"
				} font-bold transition-all duration-400`}
			>
				Developers {isUiHovered ? <MdArrowDownward /> : <IoIosArrowDown />}
			</div>
			{isUiHovered && (
				<div
					id="snippetNav"
					className="absolute right-1/2 translate-x-1/3 top-[3.5rem] bg-slate-900 py-7 px-8 rounded-lg border-2 border-slate-800 flex flex-col sds:flex-row gap-5 shadow-lg shadow-gray-900 w-[60dvw]"
				>
					<div className="flex flex-col gap-5 sds:w-1/2 h-max">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/sgc93/dotcode"
							className="flex flex-col gap-1 w-full bg-slate-950 bg-opacity-50 rounded-lg py-[18px] px-[13px] border-2 border-slate-800 transition-all duration-300 hover:bg-opacity-70 hover:border-slate-700 cursor-pointer overflow-hidden"
							onMouseEnter={() => setIsHovered3(true)}
							onMouseLeave={() => setIsHovered3(false)}
						>
							<span className="text-slate-300 text-sm font-semibold">
								<span
									className={`${
										isHovered3 && "text-color-6"
									} transition-all duration-300 `}
								>
									Front-End
								</span>{" "}
								source code
							</span>
							<span className="text-slate-500">
								Access a front end source code of this whole website, which is
								developed with React and different package, for free
							</span>
						</a>
						<a
							className="flex flex-col gap-1 w-full bg-slate-950 bg-opacity-50 rounded-lg p-[14px] border-2 border-slate-800 transition-all duration-300 hover:bg-opacity-70 hover:border-slate-700 cursor-pointer overflow-hidden"
							onMouseEnter={() => setIsHovered4(true)}
							onMouseLeave={() => setIsHovered4(false)}
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/sgc93/dotcode-api"
						>
							<span className="text-slate-300 text-sm font-semibold">
								<span
									className={`${
										isHovered4 && "text-color-2"
									} transition-all duration-300 `}
								>
									Back-End
								</span>{" "}
								source code
							</span>
							<span className="text-slate-500">
								Check an api source code of this website, made of Nodejs, on
								github
							</span>
						</a>
					</div>
					<a
						className="flex flex-col gap-1 h-[10.5rem] sds:h-max sds:w-1/2 bg-slate-950 bg-opacity-50 rounded-lg p-5 border-2 border-slate-800 transition-all duration-300 hover:bg-opacity-70 hover:border-slate-700 cursor-pointer overflow-hidden"
						onMouseEnter={() => setIsHovered1(true)}
						onMouseLeave={() => setIsHovered1(false)}
						target="_blank"
						rel="noopener noreferrer"
						href="https://documenter.getpostman.com/view/38037883/2sAY4rG5vR"
					>
						<span className="flex font-bold tracking-wide capitalize text-blue-500">
							DotCode API Documentation
						</span>
						<div className="flex flex-col gap-1">
							<span className="text-slate-300 text-sm font-semibold tracking-wide">
								build with{" "}
								<span
									className={`${
										isHovered1 && "text-red-500"
									} transition-all duration-300 `}
								>
									Nodejs
								</span>
								,{" "}
								<span
									className={`${
										isHovered1 && "text-cyan-500"
									} transition-all duration-300 `}
								>
									Express
								</span>{" "}
								and{" "}
								<span
									className={`${
										isHovered1 && "text-orange-500"
									} transition-all duration-300 `}
								>
									MongoDB
								</span>{" "}
							</span>
							<span className="text-slate-500">
								See through the api documentation and start to integrate with
								application or contribute on it
							</span>
						</div>
						<img
							src="/assets/snippet1.svg"
							alt=""
							width={130}
							className={`self-end translate-x-7 translate-y-4 transition-all duration-300 ${
								isHovered1
									? "-rotate-[30deg] scale-110"
									: " -rotate-45 scale-100"
							}`}
						/>
					</a>
				</div>
			)}
		</div>
	);
};

export default DevelopersNav;
