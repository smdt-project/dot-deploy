import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Button from "./ui/Button";
import Grid from "./ui/Grid";
import Logo from "./ui/Logo";
import NavBtn from "./ui/NavBtn";
import { navLinks } from "./utils/constants";

const SideNav = () => {
	const [isOpened, setIsOpened] = useState(false);

	const handleNav = () => setIsOpened((isOpened) => !isOpened);

	return (
		<div className="sm:hidden">
			{!isOpened ? (
				<Button
					onClick={() => handleNav()}
					className={"text-n-2 hover:text-n-1 transition-all duration-300"}
				>
					<BiDotsVerticalRounded size={23} />
				</Button>
			) : (
				<div className=" w-[100dvw] h-[100vh] absolute right-0 top-0 flex flex-col items-end md:gap-2 gap-1 z-50 bg-n-12 backdrop-blur-md">
					<Grid />
					<div className="w-2/3 h-[29rem] bg-n-13 border-2 border-n-6 rounded-lg m-4 overflow-hidden shadow-lg shadow-n-11 flex flex-col items-center gap-4 bg-[url('assets/spotlight_right.svg')] bg-top bg-cover">
						<div className="w-full flex justify-between items-center border-b-2 border-n-6 py-4 pr-4 pl-7 backdrop-blur-md">
							<Logo />
							<Button
								onClick={() => handleNav()}
								className={
									"text-n-2 hover:text-n-1 transition-all duration-300"
								}
							>
								<MdClose size={23} />
							</Button>
						</div>
						<nav className="flex flex-col gap-3 p-5">
							{navLinks &&
								navLinks.map((link, index) => (
									<NavBtn
										key={index}
										href={link.href}
										onClick={() => setIsOpened(false)}
									>
										{link.title}
									</NavBtn>
								))}
						</nav>
						<div className="self-stretch mx-5 mt-12 p-4 border-t-2 border-n-11 flex items-center justify-center">
							<img src="./dot.svg" alt="" className="opacity-40 w-44" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SideNav;
