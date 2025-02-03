const Spotlight = () => {
	return (
		<div className="absolute top-0 flex w-[100dvw] justify-between z-[-1]">
			{" "}
			<img src="./assets/spotlight_left.svg" alt="" className="w-[50%]" />
			<img src="./assets/spotlight_right.svg" alt="" className="w-[50%]" />
		</div>
	);
};

export default Spotlight;
