import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";
import { useState } from "react";
import FormattedLetter from "./FormattedLetter";

gsap.registerPlugin(TextPlugin);
const classes =
	"rounded-full w-3 h-3 opacity-50 transition-all duration-300 hover:opacity-100 hover:scale-[1.2]";

const CodeBox = ({ sampleCode }) => {
	const [lng] = useState(sampleCode.lng);

	useGSAP(() => {
		const tl = gsap.timeline({
			defaults: { duration: 3, ease: "power1.inOut" },
			yoyo: true,
		});

		tl.fromTo(
			`.box`,
			{ opacity: 0, y: "-100%", rotateZ: 45 },
			{
				opacity: 1,
				y: 0,
				rotateZ: 0,
				ease: "bounce.out",
				duration: 1,
				yoyo: true,
				stagger: 0.3,
			}
		).fromTo(
			`.${lng}Code span`,
			{ opacity: 0 },
			{
				repeat: -1,
				repeatDelay: 1.3,
				yoyo: true,
				ease: "bounce.out",
				opacity: 1,
				stagger: 0.05,
			}
		);
	}, []);

	return (
		<div
			className={`box bg-n-13 border-n-7 border-2 rounded-md min-w-24 flex-auto empty:flex-grow-1`}
		>
			<div className="border-b-2 border-n-6 py-1 px-2 flex items-center justify-between h-7">
				<span className="text-n-2">{sampleCode.lng}</span>
				<div className="flex items-center gap-1">
					<span className={`${classes}  bg-color-3`}></span>
					<span className={`${classes} bg-color-2`}></span>
					<span className={`${classes} bg-color-4`}></span>
				</div>
			</div>
			<pre className="px-4 pb-4">
				<code className={`${sampleCode.lng}Code`}>
					{sampleCode.code.split("").map((letter, index) => (
						<FormattedLetter letter={letter} key={index} />
					))}
				</code>
			</pre>
		</div>
	);
};

export default CodeBox;
