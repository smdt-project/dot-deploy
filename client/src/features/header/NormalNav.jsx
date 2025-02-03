import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NavBtn from "../../ui/NavBtn";
import Search from "../search/Search";
import DevelopersNav from "./DevelopersNav";
import FeaturesNav from "./FeaturesNav";
import ResourceNav from "./ResourceNav";

const NormalNav = ({ isHome }) => {
	const navigateTo = useNavigate();
	const { isUserSignedIn } = useSelector((state) => state.auth);
	const { goAnonymously } = useSelector((state) => state.community);
	const [isSearching, setIsSearching] = useState(false);
	const { pathname } = useLocation();
	const hasSearchBar =
		pathname === "/community" && (isUserSignedIn || goAnonymously);
	const showHomeNav =
		pathname.includes("/community") || pathname.includes("/profile");
	const showCommNav = pathname === "/" || pathname.includes("/profile");

	const handleClick = (href) => navigateTo(href);

	return (
		<nav className="flex sm:items-center md:justify-center md:gap-3 sm:gap-1 md:flex-grow">
			{!isSearching && (
				<div className="md:flex items-center md:gap-3 sm:gap-1 hidden">
					{showHomeNav && (
						<NavBtn href={""} onClick={() => handleClick("/")}>
							Home
						</NavBtn>
					)}
					{showCommNav && (
						<NavBtn href={""} onClick={() => handleClick("/community")}>
							Community
						</NavBtn>
					)}
					<NavBtn href={""} onClick={() => handleClick("/editor/dotcode")}>
						Editor
					</NavBtn>
					{isHome && <FeaturesNav />}
					<ResourceNav />
					<DevelopersNav />
				</div>
			)}
			{hasSearchBar && <Search setIsSearching={setIsSearching} />}
		</nav>
	);
};

export default NormalNav;
