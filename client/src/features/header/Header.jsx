import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../ui/Logo";
import Account from "../auth/Account";
import NormalNav from "./NormalNav";
import SideNav from "./SideNav";

const Header = () => {
	const [isHome, setIsHome] = useState(true);
	const currPath = useLocation().pathname;

	useEffect(() => {
		if (currPath === "/") {
			setIsHome(true);
		} else {
			setIsHome(false);
		}
	}, [currPath]);

	useGSAP(() => {
		gsap.to("#header", {
			opacity: 1,
			duration: 1,
		});
	}, []);

	return (
		<header
			id="header"
			className="sm:h-16 fixed top-0 w-[100dvw] flex items-center justify-between border-b-2 border-slate-800 text-white p-4 m-0 backdrop-blur-xl bg-slate-900 bg-opacity-50 z-[88]"
		>
			<Logo isHome={isHome} />
			<NormalNav isHome={isHome} />
			<div className="h-full flex items-center sm:gap-3">
				<Account />
				<SideNav isHome={isHome} />
			</div>
		</header>
	);
};

export default Header;
