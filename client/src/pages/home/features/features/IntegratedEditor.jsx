import { useState } from "react";
import Grid from "../../../../ui/Grid";
import FeatureTopic from "./FeatureTopic";

const IntegratedEditor = ({ feature }) => {
	const [isLoggedIng, setIsLoggedIn] = useState(false);
	const updatedFeature = {
		...feature,
		btnLink: "/editor/dotcode",
	};

	return (
		<section id={feature.id} className="flex flex-col">
			<FeatureTopic feature={updatedFeature} />
			<div className="relative w-full flex  px-32 pt-24 pb-44">
				<Grid />
				<img
					src="./assets/editor1.png"
					alt=""
					className=" w-[60dvw] rounded-lg overflow-hidden translate-y-14 translate-x-5"
				/>
				<img
					src="./assets/editor2.png"
					alt=""
					className="absolute left-[37%] w-[60dvw] rounded-lg overflow-hidden -translate-x-6"
				/>
			</div>
		</section>
	);
};

export default IntegratedEditor;
