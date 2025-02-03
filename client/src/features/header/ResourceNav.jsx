import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowDownward } from "react-icons/md";

const ResourceNav = () => {
	const [isUiHovered, setIsUiHovered] = useState(false);
	const [isHovered1, setIsHovered1] = useState(false);
	const [isHovered2, setIsHovered2] = useState(false);

	useGSAP(() => {
		gsap.fromTo(
			"#uiNav",
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
				} font-bold transition-all duration-300`}
			>
				Resources {isUiHovered ? <MdArrowDownward /> : <IoIosArrowDown />}
			</div>
			{isUiHovered && (
				<div
					id="uiNav"
					className="absolute top-[3.5rem] bg-slate-900 py-7 px-8 rounded-lg border-2 border-slate-800 flex flex-col sds:flex-row gap-5 shadow-lg shadow-gray-900 w-[60dvw]"
				>
					<div
						className="flex flex-col gap-2 sd:w-1/2 bg-slate-950 bg-opacity-50 rounded-lg p-5 border-2 border-slate-800 transition-all duration-300 hover:bg-opacity-70 hover:border-slate-700 cursor-pointer h-36 sds:h-44 overflow-hidden"
						onMouseEnter={() => setIsHovered1(true)}
						onMouseLeave={() => setIsHovered1(false)}
					>
						<span className="flex font-bold tracking-wide capitalize text-color-1">
							Ui component resources
						</span>
						<div className="flex flex-col gap-1">
							<span className="text-slate-300 text-sm font-semibold tracking-wide">
								<span
									className={`${
										isHovered1 && "text-red-500"
									} transition-all duration-300 `}
								>
									HTML
								</span>
								,{" "}
								<span
									className={`${
										isHovered1 && "text-cyan-500"
									} transition-all duration-300 `}
								>
									CSS
								</span>{" "}
								and{" "}
								<span
									className={`${
										isHovered1 && "text-orange-500"
									} transition-all duration-300 `}
								>
									JAVASCRIPT
								</span>{" "}
							</span>
							<span className="text-slate-500 max-w-[80%] text-wrap">
								ready to use ui-components built basically with html, css and
								js.{" "}
							</span>
						</div>
						<img
							src="/assets/ui1.svg"
							alt=""
							width={120}
							className={`self-end -translate-y-9 sd:translate-x-4 transition-all duration-300 ${
								isHovered1
									? "-rotate-[30deg] scale-110"
									: " -rotate-45 scale-100"
							}`}
						/>
					</div>
					<div
						className="flex flex-col gap-1 sd:w-1/2 bg-slate-950 bg-opacity-50 rounded-lg p-5 border-2 border-slate-800 transition-all duration-300 hover:bg-opacity-70 hover:border-slate-700 cursor-pointer h-44 overflow-hidden"
						onMouseEnter={() => setIsHovered2(true)}
						onMouseLeave={() => setIsHovered2(false)}
					>
						<span className="flex font-bold tracking-wide capitalize text-color-2">
							Code Snippet resources
						</span>
						<div className="flex flex-col gap-1">
							<span className="text-slate-300 text-sm font-semibold tracking-wide">
								with different{" "}
								<span
									className={`${
										isHovered2 && "text-green-500"
									} transition-all duration-300 `}
								>
									Back-End
								</span>{" "}
								and{" "}
								<span
									className={`${
										isHovered2 && "text-blue-500"
									} transition-all duration-300 `}
								>
									Front-End
								</span>{" "}
								anguages
							</span>
							<span className="text-slate-500">
								Access efficient, wide-scoped, reusable and upto-dated code
								snippets with multi language
							</span>
						</div>

						<img
							src="/assets/ui2.svg"
							alt=""
							width={120}
							className={`self-end translate-x-14 -translate-y-6 transition-all duration-300 ${
								isHovered2
									? "-rotate-[35deg] translate-x-16 scale-110"
									: " -rotate-[30deg] scale-100"
							}`}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ResourceNav;
