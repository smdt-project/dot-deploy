import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { getUserData } from "./features/auth/authData";
import { authStatus, userDataRequest } from "./features/auth/authSlice";
import SignIn from "./features/auth/signin/SignIn";
import SignUp from "./features/auth/singup/SignUp";
import CommunityPage from "./pages/community/CommunityPage";
import CommunityBody from "./pages/community/features/comBody/CommunityBody";
import PostDetail from "./pages/community/features/comBody/PostDetail";
import ProjectDetail from "./pages/community/features/comBody/ProjectDetail";
import EditorCodeBox from "./pages/editor/EditorCodeBox";
import EditorPage from "./pages/editor/EditorPage";
import HomePage from "./pages/home/HomePage";
import DotCodeProfile from "./pages/profile/DotCodeProfile";
import ProfilePage from "./pages/profile/ProfilePage";
import Notifier from "./ui/Notifier";

function CommonComponent() {
	return (
		<>
			<Notifier />
			<Outlet />
		</>
	);
}

const router = createBrowserRouter([
	{
		element: <CommonComponent />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/editor",
				element: <EditorPage />,
				children: [
					{
						path: "/editor/code",
						element: <EditorCodeBox />,
					},
					{
						path: "/editor/dotcode",
						element: <DotCodeProfile />,
					},
				],
			},
			{
				path: "/community",
				element: <CommunityPage />,
				children: [
					{
						path: "project/:id",
						element: <ProjectDetail />,
					},
					{
						path: "post/:id",
						element: <PostDetail />,
					},
					{
						path: "",
						element: <CommunityBody />,
					},
				],
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/login",
				element: <SignIn />,
			},
			{
				path: "/profile/:userId",
				element: <ProfilePage />,
			},
		],
	},
]);

const App = () => {
	const dispatch = useDispatch();
	const userData = getUserData();
	useEffect(() => {
		if (userData) {
			dispatch(authStatus({ isUserSignedIn: true, userData: userData }));
			dispatch(userDataRequest());
		}
	}, [dispatch, userData]);
	return <RouterProvider router={router} />;
};

export default App;
