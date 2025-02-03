import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../../features/header/Header";
import CommunityHero from "./features/comHero/CommunityHero";
import CommunitySidebar from "./features/comSidebar/CommunitySidebar";
import ProfileSideBar from "./features/comSidebar/ProfileSideBar";

const CommunityPage = () => {
	const { isUserSignedIn } = useSelector((state) => state.auth);
	const { goAnonymously, isSidebarOpened } = useSelector(
		(state) => state.community
	);
	const openBody = isUserSignedIn || goAnonymously;
	const openHero = !isUserSignedIn && !goAnonymously;

	return (
		<section className="bg-n-13 flex flex-col">
			<Header />
			{openHero && <CommunityHero />}
			{openBody && (
				<div className="flex flex-grow h-[100dvh] pt-[8dvh]">
					<CommunitySidebar />
					<Outlet />
					{isSidebarOpened && <ProfileSideBar />}
				</div>
			)}
		</section>
	);
};

export default CommunityPage;
