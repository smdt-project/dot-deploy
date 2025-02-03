import { BiCheck } from "react-icons/bi";
import { useSelector } from "react-redux";

const LngTab = ({ lng, handleClick }) => {
	const { currLng } = useSelector((state) => state.project);
	const isSelected = lng.lngName === currLng;

	return (
		<button
			className={`flex items-center justify-between gap-2 text-lg w-full px-6 transition-all duration-300 ${
				isSelected ? "bg-slate-500 bg-opacity-20" : ""
			} hover:bg-slate-500 hover:bg-opacity-20 text-slate-400 hover:text-slate-300 cursor-pointer`}
			onClick={() => handleClick("snippet", lng.lngName)}
		>
			<div className="flex items-center gap-2">
				{lng.icon}
				<span className=" font-semibold">{lng.lngName}</span>
			</div>
			{isSelected && <BiCheck />}
		</button>
	);
};

export default LngTab;
