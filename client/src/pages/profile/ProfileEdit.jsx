import { useState } from "react";
import { CgPassword } from "react-icons/cg";
import { TbUserScreen, TbUserX } from "react-icons/tb";
import { useSelector } from "react-redux";
import { validateUserName } from "../../utils/validators";

const inputClasses =
	"bg-slate-800 bg-opacity-60 outline-none rounded-md px-2 py-1 placeholder:text-slate-300 text-slate-200 text-semibold outline-none transition-all duration-300 border-slate-800 border-opacity-60 border-[1px]  focus:border-slate-600 placeholder:text-slate-600";

const UserAccountDel = () => {
	const handleSubmit = () => {};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-3 text-red-500">
				<TbUserX />
				<span>Account</span>
				<div className="flex-grow h-[1px] bg-slate-800" />
			</div>
			<div className="flex flex-col gap-3 justify-between p-3 rounded-lg bg-slate-900 bg-opacity-70 border-[1px] border-red-500 border-opacity-40">
				<div className="flex flex-col gap-1">
					<span className="text-red-600 font-semibold">
						Are you sure about this?🥴
					</span>
					<span className="text-slate-400">
						This action will remove your entire works including projects and
						posts, both private and public, from the database permanently. you
						have invested some shit on this account, think about it🙏🏻
					</span>
				</div>
				<div className="flex items-center gap-3 sm:gap-5">
					<span className="text-slate-300">
						Are You sure you want to delete this account?
					</span>
					<button className="bg-red-600 font-bold bg-opacity-40 text-slate-300 self-end px-3 py-1 rounded-md transition-all duration-300 hover:bg-opacity-100 hover:text-slate-900">
						Delete this account
					</button>
				</div>
			</div>
		</div>
	);
};
const PasswordChange = () => {
	const { user } = useSelector((state) => state.auth);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPass, setConfirmNewPass] = useState("");
	const [inputErr, setInputErr] = useState(null);

	const handleSubmit = () => {
		const isNameValid = validateUserName(name);

		if (isNameValid) {
			setInputErr(isNameValid);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-3 text-color-2">
				<CgPassword />
				<span>Password</span>
				<div className="flex-grow h-[1px] bg-slate-800" />
			</div>
			<div className="flex flex-col d:flex-row gap-5">
				<div className="w-fit d:w-[25rem] p-3 rounded-lg flex flex-col gap-3 bg-slate-900 bg-opacity-70 border-[1px] border-color-2 border-opacity-40">
					<div className="flex items-center gap-2 justify-between">
						<span className="text-slate-400">Old password:</span>
						<input
							type="password"
							className={inputClasses}
							placeholder="Old password"
							value={oldPassword}
							onChange={(event) => setOldPassword(event.target.value)}
							required
						/>
					</div>
					<div className="flex items-center gap-2 justify-between">
						<span className="text-slate-400">New password:</span>
						<input
							type="password"
							className={inputClasses}
							placeholder="New Password"
							value={newPassword}
							onChange={(event) => setNewPassword(event.target.value)}
							required
						/>
					</div>
					<div className="flex items-center gap-2 justify-between">
						<span className="text-slate-400">Confirm new password:</span>
						<input
							type="password"
							className={inputClasses}
							placeholder="Confirm new password"
							value={confirmNewPass}
							onChange={(event) => setConfirmNewPass(event.target.value)}
							required
						/>
					</div>
					<button className="bg-slate-800 text-slate-300 self-end px-3 py-1 rounded-md transition-all duration-300 hover:bg-slate-700 hover:text-slate-100">
						Change
					</button>
				</div>
				<div className=" d:w-[52%] flex flex-col items-center gap-4 justify-between p-3 rounded-lg bg-slate-900 bg-opacity-70 border-[1px] border-color-2 border-opacity-40">
					<div className="flex flex-col gap-3">
						<span className="text-slate-400">
							Have you forgotten your password ?
						</span>
						<span>
							We will send an email, to your current email address{" "}
							<span className="text-color-5"> {user.email}</span>, which
							contains a redirecting link of a webpage so you can set new
							password.
						</span>
					</div>

					<button className="bg-color-2 bg-opacity-40 text-slate-300 self-end px-3 py-1 rounded-md transition-all duration-300 hover:bg-opacity-100 hover:text-slate-900">
						Send reset email
					</button>
				</div>
			</div>
		</div>
	);
};

const BasicProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const [name, setName] = useState(user.name);
	const [bio, setBio] = useState(user.bio);
	const [email, setEmail] = useState(user.email);
	const [inputErr, setInputErr] = useState(null);

	const handleSubmit = () => {
		const isNameValid = validateUserName(name);

		if (isNameValid) {
			setInputErr(isNameValid);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-3 text-blue-600">
				<TbUserScreen />
				<span>Basic profle</span>
				<div className="flex-grow h-[1px] bg-slate-800" />
			</div>
			<div className="w-fit p-3 rounded-lg flex flex-col gap-3 bg-slate-900 bg-opacity-70 border-[1px] border-blue-600 border-opacity-40">
				<div className="flex items-center justify-between gap-2">
					<span className="text-slate-400">Username:</span>
					<input
						type="text"
						className={inputClasses}
						placeholder="New username"
						value={name}
						onChange={(event) => setName(event.target.value)}
						required
					/>
				</div>
				<div className="flex items-center gap-2 justify-between">
					<span className="text-slate-400">Bio:</span>
					<input
						type="text"
						className={inputClasses}
						placeholder="New bio"
						value={bio}
						onChange={(event) => setBio(event.target.value)}
						required
					/>
				</div>
				<div className="flex items-center gap-2 justify-between">
					<span className="text-slate-400">Email:</span>
					<input
						type="text"
						className={inputClasses}
						placeholder="New email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
				</div>
				<button className="bg-slate-800 text-slate-300 self-end px-3 py-1 rounded-md transition-all duration-300 hover:bg-slate-700 hover:text-slate-100">
					Update
				</button>
			</div>
		</div>
	);
};

const ProfileEdit = () => {
	return (
		<div className="flex flex-col gap-7 pt-5 sm:pt-7 w-full pr-3">
			<div className="flex flex-col sds:flex-row gap-5 sm:gap-7">
				<BasicProfile />
				<PasswordChange />
			</div>
			<UserAccountDel />
		</div>
	);
};

export default ProfileEdit;
