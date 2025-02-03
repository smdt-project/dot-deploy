import { MdOutlineCopyright } from "react-icons/md";

const NewsFooter = () => {
	const date = new Date();

	return (
		<div
			className={`flex items-center justify-center gap-3 text-sm font-sans text-center py-3 mt-6 text-slate-500`}
		>
			<img src="/dot.svg" alt="" width={18} height={18} />
			<div className="flex items-center gap-2">
				<MdOutlineCopyright />
				<span>{date.getFullYear()} DotCode</span>
			</div>
			<div className="flex items-center gap-2">
				{["Terms", "Privacy", "Security", "Status", "Docs"].map(
					(tab, index) => (
						<span key={index}>{tab}</span>
					)
				)}
			</div>
		</div>
	);
};

export default NewsFooter;
