import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { GoDot } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Loading = ({ message }) => {
	useGSAP(() => {
		gsap.to(".loadingDot", {
			x: 14,
			repeat: -1,
			yoyo: true,
			stagger: 0.2,
			duration: 0.5,
			ease: "power1.inOut",
		});
	});

	return (
		<div className="flex flex-col gap-4 items-center justify-center">
			<div className="flex items-center text-color-5">
				<IoIosArrowBack size={30} />
				<div className="loadingDot">
					<GoDot size={22} />
				</div>
				<div className="loadingDot">
					<GoDot size={22} />
				</div>
				<div className="loadingDot">
					<GoDot size={22} />
				</div>
				<IoIosArrowForward size={30} />
			</div>
			<span className="text-slate-400">{message}</span>
		</div>
	);
};

export default Loading;
