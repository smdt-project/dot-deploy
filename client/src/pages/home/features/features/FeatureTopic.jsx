import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "../../../../ui/Button";

const FeatureTopic = ({ feature, children, isApi }) => {
	const navigateTo = useNavigate();

	return (
		<div className="w-full flex flex-col gap-4 items-start pl-7 sm:pl-12  md:pl-48 pb-10 shadow-md border-b-2 border-slate-800 bg-gradient-to-t from-n-8 from-50%">
			<div
				className={`text-[3rem] p-3 rounded-full bg-opacity-55 border-2 ${feature.className} mb-2`}
			>
				{feature.icon}
			</div>
			<h2 className={`font-bold ${feature.textClass} text-xl capitalize`}>
				{feature.tag}
			</h2>
			<h1 className=" text-4xl font-black capitalize">{feature.title}</h1>
			<p className=" text-slate-400 sm:w-3/4 md:w-1/2">{feature.detail}</p>
			{feature.hasBtn && (
				<>
					{isApi ? (
						<a
							href={feature.btnLink}
							target="blank"
							className={`rounded-full ${feature.btnClass} py-2 px-4 font-bold mt-3 transition-all duration-300 hover:bg-opacity-100 bg-opacity-90 flex items-center gap-2`}
						>
							<span>{feature.btnText}</span>
							<IoIosArrowForward className="text-slate-300" />
						</a>
					) : (
						<Button
							className={`rounded-full ${feature.btnClass} py-2 px-4 font-bold mt-3 transition-all duration-300 hover:bg-opacity-100 bg-opacity-90 flex items-center gap-2`}
							onClick={() => navigateTo(feature.btnLink)}
						>
							<span>{feature.btnText}</span>
							<IoIosArrowForward className="text-slate-300" />
						</Button>
					)}
				</>
			)}
			{children}
		</div>
	);
};

export default FeatureTopic;
