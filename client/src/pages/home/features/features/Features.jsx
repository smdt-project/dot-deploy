import { featuresContent } from "../../../../utils/constants";
import APIAccess from "./APIAcess";
import IntegratedEditor from "./IntegratedEditor";
import JoinCommunity from "./JoinCommunity";
import Multilingual from "./Multilingual";
import Snippet from "./Snippet";
import UIManage from "./UIManage";

const features = featuresContent;

const Features = () => {
	return (
		<section id="features" className=" w-full flex flex-col sm:gap-24">
			<IntegratedEditor feature={features[0]} />
			<Multilingual feature={features[1]} />
			<Snippet feature={features[2]} />
			<UIManage feature={features[3]} />
			<JoinCommunity feature={features[4]} />
			<APIAccess feature={features[5]} />
		</section>
	);
};

export default Features;
