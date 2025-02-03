const Grid = () => {
	return (
		<div className=" w-full absolute flex flex-col items-center justify-center z-[-2] opacity-75">
			<img src="./assets/grid.svg" alt="" className="w-full" />
			<img
				src="./assets/grid.svg"
				alt=""
				className="w-full rotate-180 md:hidden"
			/>
		</div>
	);
};

export default Grid;
