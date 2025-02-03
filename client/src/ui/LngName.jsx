import { useEffect, useState } from "react";
import { supportedLng } from "../utils/supportedLng";

const LngName = ({ name, isSnippet }) => {
	const [lng, setLng] = useState({});

	useEffect(() => {
		if (isSnippet) {
			supportedLng.forEach((lng) => {
				if (lng.lngName === name) setLng(lng);
			});
		}
	}, [name, isSnippet]);

	return isSnippet ? (
		<div className="flex items-center gap-2 text-sm font-code">
			{lng.icon}
			<span className="">{lng.lngName}</span>
		</div>
	) : (
		<>
			<div className="flex items-center gap-1">
				<div className="w-[0.6rem] h-[0.6rem] bg-red-500 rounded-full" />
				<span>html</span>
			</div>
			<div className="flex items-center gap-1">
				<div className="w-[0.6rem] h-[0.6rem] bg-cyan-500 rounded-full" />
				<span>css</span>
			</div>
			<div className="flex items-center gap-1">
				<div className="w-[0.6rem] h-[0.6rem] bg-yellow-500 rounded-full" />
				<span>js</span>
			</div>
		</>
	);
};

export default LngName;
