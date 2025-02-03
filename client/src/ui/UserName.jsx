const UserName = ({
	name,
	projectName,
	avatarUrl,
	onProject,
	onOwner,
	avatarClasses,
}) => {
	return (
		<div className="flex gap-2">
			{avatarUrl ? (
				<img
					src={avatarUrl}
					alt=""
					className={`${
						avatarClasses
							? avatarClasses
							: "min-w-6 min-h-6 w-6 h-6 rounded-full"
					} self-start rounded-full border-[1px] border-color-5`}
				/>
			) : (
				<div
					className={`${
						avatarClasses
							? avatarClasses
							: "min-w-6 min-h-6 w-6 h-6 rounded-full"
					} flex items-center justify-center self-start rounded-full border-[1px] border-color-5 bg-color-7 text-slate-950 text-xl font-bold uppercase`}
				>
					{name[0]}
				</div>
			)}
			<div className="text-slate-300">
				<a
					className=" transition-all duration-300 hover:text-color-5 underline underline-offset-4 cursor-pointer"
					onClick={() => onOwner()}
				>
					{name}
				</a>
				<span className="text-slate-500">{projectName && "/"}</span>
				{projectName && (
					<a
						className="text-slate-300 transition-all duration-300 hover:text-color-5 cursor-pointer underline underline-offset-4"
						onClick={() => onProject()}
					>
						{projectName.split(" ").join("-")}
					</a>
				)}
			</div>
		</div>
	);
};

export default UserName;
