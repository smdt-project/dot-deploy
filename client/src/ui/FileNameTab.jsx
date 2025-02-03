const FileNameTab = ({ lngName, handleSelection, selectedLng }) => {
	return (
		<button
			className={`${
				lngName === selectedLng ? "border-b-color-3" : "border-b-n-14"
			} border-b-2 text-sm text-slate-400 px-2 py-1 uppercase`}
			onClick={() => handleSelection(lngName)}
		>
			{lngName}
		</button>
	);
};

export default FileNameTab;
