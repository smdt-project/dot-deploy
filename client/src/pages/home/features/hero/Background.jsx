import Grid from "../../../../ui/Grid";
import Spotlight from "../../../../ui/Spotlight";

const Background = () => {
	return (
		<div className=" absolute top-0 inset-0 z-[-1]">
			<Grid />
			<Spotlight />
		</div>
	);
};

export default Background;
