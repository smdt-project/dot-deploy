import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import AI from "../../../../ui/AI";
import AICode from "../../../../ui/AICode";
import Grid from "../../../../ui/Grid";
import { supportedLng } from "../../../../utils/supportedLng";
import FeatureTopic from "./FeatureTopic";

const languages = supportedLng;

const SupportedLanguages = () => {
	const [selectedLngI, setSelectedLngI] = useState(4);

	useGSAP(() => {
		gsap.to(".supported-languages-list", {
			x: "-50%",
			repeat: -1,
			yoyo: true,
			duration: 15,
			ease: "none",
		});
	}, []);

	const selecteLng = (index) => {
		setSelectedLngI(index);
	};

	return (
		<div className="relative mt-7 overflow-x-hidden w-full md:w-1/2">
			<div className=" supported-languages-list flex items-center gap-7 w-full">
				{languages.map((lng, index) => (
					<div
						key={index}
						className={`flex flex-col items-center gap-4 transition-all duration-300 cursor-pointer p-2 rounded-lg ${
							index === selectedLngI
								? " text-color-5 "
								: "text-slate-400 hover:text-slate-300"
						}`}
						onClick={() => selecteLng(index)}
					>
						<div className="scale-[2.3] saturate-200">{lng.icon}</div>
						<span>{lng.lngName}</span>
						<div
							className={`w-2 h-2 bg-color-5 rounded-full ${
								index === selectedLngI ? "opacity-100" : "opacity-0"
							}`}
						></div>
					</div>
				))}
			</div>
			<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-l from-n-8 via-transparent to-n-8"></div>
		</div>
	);
};

const Multilingual = ({ feature }) => {
	return (
		<section id={feature.id} className="flex flex-col overflow-x-hidden">
			<FeatureTopic feature={feature}>
				<SupportedLanguages />
			</FeatureTopic>
			<div className="flex flex-col-reverse md:flex-auto md:flex-row justify-between sm:items-center md:px-10 sd:px-24 py-14 w-screen">
				<Grid />
				<AI />
				<AICode />
			</div>
		</section>
	);
};

export default Multilingual;
