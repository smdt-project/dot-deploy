const NavBtn = ({ children, href, className, onClick }) => {
	return (
		<a
			href={href}
			className={`${className} tracking-wide text-n-3 hover:text-n-1 font-bold transition-all duration-300 md:px-1`}
			onClick={onClick}
		>
			{children}
		</a>
	);
};

export default NavBtn;
