import { overridingScript } from "../../../../utils/constants";

const ResultFrame = ({ srcDoc }) => {
	srcDoc = srcDoc.replace("/override/", overridingScript);

	return (
		<iframe
			srcDoc={srcDoc}
			title="output"
			height={"100%"}
			width={"100%"}
			sandbox="allow-scripts"
		/>
	);
};

export default ResultFrame;
