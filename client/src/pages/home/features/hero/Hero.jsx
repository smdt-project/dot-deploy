import gsap from "gsap";

import { TextPlugin } from "gsap/all";
import Background from "./Background";
import HeroContent from "./HeroContent";
import SampleUIs from "./SampleUIs";

gsap.registerPlugin(TextPlugin);

const Hero = () => {
	return (
		<section id="hero" className="w-[100dvw]">
			<Background />
			<div className="md:relative flex md:flex-row flex-col md:h-[170dvh] sm:h-[190dvh] mt-60 sm:gap-20">
				<HeroContent />
				<SampleUIs />
			</div>
		</section>
	);
};

export default Hero;
