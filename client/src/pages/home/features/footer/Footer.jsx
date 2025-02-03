import Button from "../../../../ui/Button";
import Logo from "../../../../ui/Logo";
import { footerContents } from "../../../../utils/constants";

const FooterLink = ({ link }) => {
	return (
		<Button
			className={
				"text-slate-400 font-semibold transition-all duration-300 hover:text-slate-300"
			}
		>
			{link.name}
		</Button>
	);
};

const FooterCategory = ({ content }) => {
	return (
		<div className="flex flex-col items-start gap-2 sm:gap-4">
			<span className="sm:text-lg font-bold text-slate-200">
				{content.category}
			</span>
			<div className="flex flex-col items-start gap-1 sm:gap-2">
				{content.links.map((link, index) => (
					<FooterLink key={index} link={link} />
				))}
			</div>
		</div>
	);
};

const Footer = () => {
	return (
		<footer
			id="contact"
			className="h-fit min-h-[28rem] w-full flex flex-col gap-10 bg-gradient-to-b  from-slate-900 to-n-8 mt-28 border-t-2 border-slate-700 py-10"
		>
			<div className="flex flex-1 gap-20 sm:gap-10 flex-wrap justify-evenly">
				{footerContents.map((content, index) => (
					<FooterCategory key={index} content={content} />
				))}
			</div>
			<div className="flex flex-col items-end gap-1 sm:gap-5 justify-evenly px-10">
				<div className="flex items-center gap-1 ">
					<Logo className={"sm:scale-100 scale-75"} />
					<span className="sm:text-lg font-bold text-slate-400 ">
						Mange your code effortlessly
					</span>
				</div>
				<p className="text-color-5">
					&copy; 2024 DotCode. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
