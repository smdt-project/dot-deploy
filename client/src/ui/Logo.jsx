const Logo = ({ className, isHome }) => {
	return (
		<div className={`${className} ${isHome ? "w-20 md:w-24" : "w-28 md:w-32"}`}>
			<img
				src={isHome ? "./logo.svg" : "./logo_community.svg"}
				alt="dotCode"
				width={"100%"}
			/>
		</div>
	);
};

export default Logo;
