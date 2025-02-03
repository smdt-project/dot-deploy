import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowDownward } from "react-icons/md";
import { featuresContent } from "../../utils/constants";

const FeatureTab = ({ feature, setIsFeatureHovered }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<a
			className={`flex items-center gap-3 rounded-md pl-3 pr-5 py-2 transition-all duration-300 cursor-pointer font-semibold ${
				isHovered
					? feature.btnClass + " bg-opacity-70 text-slate-50"
					: "text-slate-300 bg-slate-700 bg-opacity-30"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			href={`#${feature.id}`}
			onClick={() => setIsFeatureHovered(false)}
		>
			<div className="text-xl">{feature.icon}</div>
			<span>{feature.title}</span>
		</a>
	);
};

const features = featuresContent;

const FeaturesNav = () => {
	const [isFeatureHovered, setIsFeatureHovered] = useState(false);

	useGSAP(() => {
		gsap.fromTo(
			"#featuresNav",
			{ opacity: 0.6, y: -4 },
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
			}
		);
	}, [isFeatureHovered]);

	return (
		<div
			className={`relative md:px-1 flex items-center justify-center`}
			onMouseEnter={() => setIsFeatureHovered(true)}
			onMouseLeave={() => setIsFeatureHovered(false)}
		>
			<div
				className={`flex items-center gap-2 h-14 cursor-default tracking-wide ${
					isFeatureHovered ? "text-n-1" : "text-n-3"
				} font-bold transition-all duration-400`}
			>
				Features {isFeatureHovered ? <MdArrowDownward /> : <IoIosArrowDown />}
			</div>
			{isFeatureHovered && (
				<div
					id="featuresNav"
					className="absolute top-[3.6rem] w-max bg-slate-900 p-3 rounded-lg border-2 border-slate-800 flex flex-col gap-2 shadow-lg shadow-gray-900 "
				>
					{features.map((feature, index) => (
						<FeatureTab
							feature={feature}
							key={index}
							setIsFeatureHovered={setIsFeatureHovered}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default FeaturesNav;
