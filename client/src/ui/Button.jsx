import { IoIosArrowForward } from "react-icons/io";

const Button = ({ children, className, type, onClick, withIcon }) => {
	const classes =
		"font-code sm:text-lg text-n-1 capitalize flex items-center gap-2  font-semibold sm:min-h-10 min-h-8 px-2 md:px-5  w-auto transition-all duration-300";

	const outlinedBtn = () => (
		<button className={`${className} ${classes} border-2`} onClick={onClick}>
			{children}
			{withIcon && <IoIosArrowForward />}
		</button>
	);

	const textBtn = () => (
		<button
			className={`${className} ${classes} text-n-2  hover:text-n-1`}
			onClick={onClick}
		>
			{children}
			{withIcon && <IoIosArrowForward />}
		</button>
	);

	const elevatedBtn = () => (
		<button
			className={`${className} ${classes} text-white  bg-color-7 hover:bg-color-5 active:bg-color-1 rounded-lg`}
			onClick={onClick}
		>
			{children}
			{withIcon && <IoIosArrowForward />}
		</button>
	);

	const JustBtn = () => {
		return (
			<button className={className} onClick={onClick}>
				{children}
			</button>
		);
	};

	if (type === "elevated") {
		return elevatedBtn();
	} else if (type === "outlined") {
		return outlinedBtn();
	} else if (type === "text") {
		return textBtn();
	} else {
		return JustBtn();
	}
};

export default Button;
