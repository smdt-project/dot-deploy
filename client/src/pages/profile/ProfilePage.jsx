import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useEffect } from "react";
import Header from "../../features/header/Header";
import ProfileEdit from "./ProfileEdit";
import ProfileHeader from "./ProfileHeader";
import { userProfileRequest } from "./profileSlice";
import ProfileTabs from "./ProfileTabs";
import UserComments from "./UserComments";
import UserPosts from "./UserPosts";
import UserProfileSidebar from "./UserProfileSidebar";
import UserProjects from "./UserProjects";

const ProfilePage = () => {
	const { userId } = useParams();
	const { isUserSignedIn, user } = useSelector((state) => state.auth);
	const { currTab, userData, profileChanged } = useSelector(
		(state) => state.profile
	);
	const isLoggedInUser = isUserSignedIn && userId === user.userId;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userProfileRequest(userId));
	}, [userId, dispatch]);

	useEffect(() => {
		if (profileChanged) {
			dispatch(userProfileRequest(userId));
		}
	}, [profileChanged, dispatch, userId]);

	return (
		<div className="flex flex-col">
			<Header />
			{userData ? (
				<div className="flex flex-col sm:flex-row flex-grow h-[91.6dvh] mt-[4rem] w-full">
					<UserProfileSidebar user={userData} isLoggedInUser={isLoggedInUser} />
					<ProfileHeader user={userData} isLoggedInUser={isLoggedInUser} />
					<div className="w-full items-center flex flex-col p-2 pb-0 so:pb-0 so:p-7">
						<ProfileTabs
							classes={
								"hidden sm:flex items-center gap-2 p-2 rounded-lg bg-slate-900 bg-opacity-70 border-2 border-slate-800"
							}
							isLoggedInUser={isLoggedInUser}
							tabData={[
								userData.projects.length,
								userData.posts.length,
								userData.comments.length,
							]}
						/>
						<div className="w-full overflow-x-hidden overflow-y-scroll h-[58.5dvh] sm:h-[98dvh] small-scroll mt-3 sd:mt-7 mb-1">
							{currTab === "profile" && isLoggedInUser && <ProfileEdit />}
							{currTab === "projects" && (
								<UserProjects isLoggedInUser={isLoggedInUser} />
							)}
							{currTab === "posts" && (
								<UserPosts isLoggedInUser={isLoggedInUser} />
							)}
							{currTab === "comments" && (
								<UserComments isLoggedInUser={isLoggedInUser} />
							)}
						</div>
					</div>
				</div>
			) : (
				<span>no user is selected</span>
			)}
		</div>
	);
};

export default ProfilePage;
