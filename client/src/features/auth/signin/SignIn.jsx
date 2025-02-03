import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../authData";
import { authStatus } from "../authSlice";
import { signInRequest } from "./signInSlice";

const SignIn = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [isHovered, setIsHovered] = useState(false);
	const { isLoading, isUserLoggedIn, error } = useSelector(
		(state) => state.signIn
	);

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isUserLoggedIn) {
			const userData = getUserData();
			dispatch(authStatus({ isUserSignedIn: true, userData: userData }));
			navigateTo(-1);
		}
	}, [isUserLoggedIn, navigateTo, dispatch]);

	const handleLogin = () => {
		dispatch(signInRequest({ email, password, confirmPassword: password }));
	};

	return (
		<div className="w-[90dvh] sm:w-auto flex flex-col text-slate-400 items-center gap-5 justify-center p-10">
			<div
				className="self-start text-slate-500 ml-[20%] flex items-center tracking-wider rounded-md transition-all duration-300 underline underline-offset-4 hover:text-color-7 cursor-pointer"
				onMouseLeave={() => setIsHovered(false)}
				onMouseEnter={() => setIsHovered(true)}
			>
				{isHovered ? <BiArrowBack /> : <IoIosArrowBack />}
				<span onClick={() => navigateTo(-1)}>back</span>
			</div>
			{isLoading && <span>loading ...</span>}
			{error && <span>{error}</span>}
			<div className="w-[27rem] flex flex-col gap-4 bg-slate-800 p-7 rounded-lg">
				<div className="flex flex-col gap-1 bg-slate-700 px-2 py-1 rounded-md border-l-4 border-color-5">
					<span className="text-slate-200 font-bold text-xl">Login</span>
					<span className="text-slate-400 ">
						Welcome back! code and add one more snippet.
					</span>
				</div>
				<div className="flex flex-col gap-4">
					<input
						type="email"
						className="bg-slate-700 bg-opacity-70 border-2 border-slate-700 rounded-md px-2 py-1 placeholder:text-slate-300 text-slate-200 text-semibold outline-none transition-all duration-300 focus:border-slate-600"
						placeholder="Email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						className="bg-slate-700 bg-opacity-70 border-2 border-slate-700 rounded-md px-2 py-1 placeholder:text-slate-300 text-slate-200 text-semibold outline-none transition-all duration-300 focus:border-slate-600"
						name="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
					<button
						className="bg-slate-600 border-2 border-slate-600 rounded-md px-2 placeholder:text-slate-300 text-slate-300 font-bold tracking-wide text-lg outline-none transition-all duration-300 hover:border-slate-500 hover:bg-slate-500 hover:text-slate-200 active:bg-slate-500"
						onClick={() => handleLogin()}
					>
						Login
					</button>
					<div className="flex items-center gap-1 py-2">
						<div className="flex-grow h-1 bg-gradient-to-l from-slate-700 via-transparent to-slate-800 rounded-full" />
						<span className="text-slate-400  uppercase">or</span>
						<div className="flex-grow h-1 bg-gradient-to-r from-slate-700 via-transparent to-slate-800 rounded-full" />
					</div>
					<button
						className="flex items-center justify-center gap-2 bg-slate-600 rounded-md px-2 py-1 text-slate-300 font-semibold transition-all duration-300 hover:text-slate-200 hover:bg-slate-500"
						onClick={() => {}}
					>
						<FcGoogle />
						Login with Google
					</button>
					<div className="flex items-center justify-end gap-3">
						<span className="text-slate-300">have no account yet?</span>
						<button
							className="rounded-md px-2 text-color-5 font-semibold tracking-wide transition-all duration-300 underline underline-offset-2 hover:text-color-7"
							onClick={(event) => navigateTo("/signup")}
						>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
