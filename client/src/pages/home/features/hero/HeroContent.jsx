import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { TbWorld } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Button from "../../../../ui/Button";

const HeroContent = () => {
	const navigateTo = useNavigate();
	const [text, setText] = useState("Code Snippets");

	useEffect(() => {
		const updateText = () => {
			setText((prevText) =>
				prevText === "Code Snippets" ? "UI Components" : "Code Snippets"
			);
			gsap.fromTo(
				".letter",
				{ opacity: 0, rotateY: 59 },
				{
					opacity: 1,
					rotateY: 0,
					ease: "none",
					stagger: 0.06,
				}
			);
			gsap.fromTo(
				".curve",
				{
					opacity: 0.4,
					scale: 0.5,
				},
				{
					opacity: 1,
					scale: 1,
				}
			);
		};

		const interval = setInterval(() => {
			updateText();
		}, 10000);

		return () => clearInterval(interval);
	}, [text]);

	useGSAP(() => {
		const tl = gsap.timeline({ repeat: 0, repeatDelay: 3 });
		tl.fromTo(
			".hero",
			{
				opacity: 0,
				skewY: 5,
			},
			{
				opacity: 1,
				skewY: 0,
				yoyo: true,
				duration: 1.5,
				stagger: 0.5,
			}
		)
			.fromTo(
				".letter-i",
				{
					rotateX: 360,
					color: "#AC6AFF",
					background: "#AC6AFF",
					height: "3.2rem",
					borderRadius: 3,
				},
				{
					yoyo: true,
					rotateX: 0,
					background: "transparent",
					color: "white",
					borderRadius: 0,
					duration: 1.6,
					ease: "bounce.out",
				}
			)
			.call(() => tl.pause());

		return () => tl.kill();
	}, []);

	return (
		<div className="relative d:w-1/2 md:h-screen h-fit flex flex-col md:items-start gap-1 md:pl-20 pl-4 items-center sm:px-10">
			<h1 className="hero align-middle sm:text-5xl md:text-6xl text-3xl md:max-w-4xl font-semibold mb-6 relative text-n-1 md:text-start text-center">
				DotCode Is The Better Way to Manage{" "}
				<span className="inline-block  relative ">
					<span className="things block">
						{Array.from(text).map((letter, index) => (
							<span
								className={`letter ${
									text === "Code Snippets" && letter === "i"
										? "letter-i absolute right-[4.75rem] md:right-[9.44rem] sm:right-[7.55rem]"
										: ""
								}`}
								key={index}
							>
								{text === "Code Snippets" && letter === "n" ? (
									<span>{letter}&nbsp;</span>
								) : (
									letter
								)}
							</span>
						))}
					</span>
					<img
						src="./assets/curve.png"
						className={`curve absolute sm:bottom-[-1.8rem] right-[-1rem] w-[10rem] md:w-72 sm:w-[14rem] opacity-80`}
						alt=""
					/>
				</span>
			</h1>
			<p className="hero sm:text-xl sm:my-8 mb-4 text-n-3 sm:font-bold text-center">
				The ultimate platform to{" "}
				<code className="text-color-3  sm:text-[1.4rem]">code</code>,{" "}
				<code className="text-color-2 sm:text-[1.4rem]">share</code>, and{" "}
				<code className="text-color-1 sm:text-[1.4rem]">collaborate</code>{" "}
				effortlessly.
			</p>
			<div className="hero flex items-center gap-6">
				<Button
					type={"elevated"}
					onClick={() => navigateTo("/editor/dotcode")}
					className={" shadow-sm md:h-12 sm:px-3"}
					withIcon
				>
					Get Started
				</Button>
				<Button
					className={
						"font-code font-semibold sm:text-lg flex items-center md:gap-4 sm:gap-2 gap-1 md:px-4 sm:px-2 md:h-12 sm:min-h-10 min-h-8 px-2 shadow-sm rounded-lg text-n-2 bg-slate-800 border-2 border-slate-800 transition-all duration-300 hover:bg-slate-700 hover:border-slate-700 hover:text-n-1"
					}
					onClick={() => navigateTo("/community")}
				>
					<span className="sm:text-[2rem] opacity-50">
						<TbWorld size={23} />
					</span>

					<span className="flex items-center gap-2">
						<span>Visit </span>
						<img src="./dot.svg" alt="" width={20} />
						<span>Community</span>
					</span>
				</Button>
			</div>
		</div>
	);
};

export default HeroContent;
