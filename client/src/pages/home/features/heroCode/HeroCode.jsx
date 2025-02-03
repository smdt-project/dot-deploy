import { sampleCodes } from "../../utils/constants";
import CodeBox from "./CodeBox";

const HeroCode = () => {
	return (
		<div className="w-full my-16 px-8 py-4 rounded-lg flex flex-wrap gap-6 justify-between">
			{sampleCodes.map((sampleCode, index) => (
				<CodeBox sampleCode={sampleCode} key={index} />
			))}
		</div>
	);
};

export default HeroCode;
