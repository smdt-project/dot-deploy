import { useEffect, useState } from "react";
import { supportedLng } from "../../../../utils/supportedLng";

const SnippetLngTab = ({ lngName }) => {
	const [selectedTab, setSelectedTab] = useState({});

	useEffect(() => {
		supportedLng.forEach((tab) => {
			if (tab.lngName === lngName) {
				setSelectedTab(tab);
			}
		});
	}, [lngName]);

	return (
		<button
			className={`flex items-center gap-1 text-sm w-full px-6 transition-all duration-300 hover:bg-slate-500 hover:bg-opacity-20 cursor-pointer`}
			onClick={() => {}}
		>
			<div>{selectedTab.icon}</div>
			<span className="text-slate-400">
				{selectedTab.title}.{selectedTab.extension}
			</span>
		</button>
	);
};

export default SnippetLngTab;
