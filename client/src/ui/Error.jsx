import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { MdRefresh } from "react-icons/md";

const Error = ({ message, tryAgain }) => {
	useGSAP(() => {
		gsap.to(".loadingDot", {
			rotateZ: 45,
			repeat: -1,
			yoyo: true,
			stagger: 0.2,
			duration: 0.5,
			ease: "power1.inOut",
		});
	});

	return (
		<div className="flex flex-col gap-4 items-center justify-center">
			<span className="flex items-center text-color-5 loadingDot">😕</span>
			<span className="text-red-400">{message}</span>
			<button
				className="flex items-center gap-1 bg-slate-700 px-2 py-[3px] rounded-full transition-all duration-300 hover:bg-slate-600 text-slate-300 hover:text-slate-50"
				onClick={() => tryAgain()}
			>
				<MdRefresh /> try again
			</button>
		</div>
	);
};

export default Error;
