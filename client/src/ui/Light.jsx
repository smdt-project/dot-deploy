const Light = ({ width, className, svgClassName, svgColor, children }) => {
	return (
		<div
			className={`absolute  flex items-center justify-center ${className} z-[-1]`}
		>
			<div className="absolute flex items-center justify-self-center gap-3 -mr-6 text-5xl font-bold">
				{children}
			</div>
			<svg
				width={width ? width : "250"}
				height="100"
				viewBox="0 0 1515 448"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={svgClassName}
			>
				<path
					d="M1515 3.99988L0 3.99975"
					stroke="url(#paint0_linear_114_322)"
					strokeWidth="6"
				/>
				<path
					d="M1419 7.99988C1419 251.005 1122.84 448 757.5 448C392.164 448 96 251.005 96 7.99988C596.274 8.31523 775.045 8.31527 775.045 8.31527C1140.38 8.31527 775.045 8.31529 1419 7.99988Z"
					fill="url(#paint1_radial_114_322)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_114_322"
						x1="0"
						y1="3.99975"
						x2="1515"
						y2="4.09261"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor={svgColor ? svgColor : "#858DFF"} stopOpacity="0" />
						<stop offset="0.584" stopColor={svgColor ? svgColor : "#858DFF"} />
						<stop
							offset="1"
							stopColor={svgColor ? svgColor : "#858DFF"}
							stopOpacity="0"
						/>
					</linearGradient>
					<radialGradient
						id="paint1_radial_114_322"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(757.5 7.99993) rotate(90) scale(440 661.5)"
					>
						<stop stopColor={svgColor ? svgColor : "#858DFF"} />
						<stop
							offset="1"
							stopColor={svgColor ? svgColor : "#858DFF"}
							stopOpacity="0"
						/>
					</radialGradient>
				</defs>
			</svg>
		</div>
	);
};

export default Light;
