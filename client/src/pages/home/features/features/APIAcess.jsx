import Grid from "../../../../ui/Grid";
import FeatureTopic from "./FeatureTopic";

const APIAccess = ({ feature }) => {
	return (
		<section id={feature.id} className="flex flex-col">
			<FeatureTopic feature={feature} isApi={true} />
			<div className=" relative h-[60vh] w-screen flex  my-14">
				<Grid />
				<div className="flex items-center justify-center w-full h-full">
					<img src="./assets/api.png" alt="" className=" h-full" />
				</div>
			</div>
		</section>
	);
};

export default APIAccess;
