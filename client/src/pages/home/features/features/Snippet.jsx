import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useState } from "react";
import { BiCopy, BiEdit, BiPlus } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdClose, MdCopyAll, MdStyle } from "react-icons/md";
import Grid from "../../../../ui/Grid";
import StaticCodeBox from "../../../../ui/StaticCodeBox";
import { sampleCodes } from "../../../../utils/constants";
import FeatureTopic from "./FeatureTopic";

const SnippetCard = ({ code, language }) => {
	let lng = language;
	if (lng === "node") {
		lng = "javascript";
	}

	return (
		<div>
			<div className="snippet-code w-[98dvw] sm:w-[43rem] bg-slate-800 bg-opacity-60 rounded-lg border-2 border-slate-700 overflow-x-hidden md:translate-y-0 -translate-y-16">
				<div className="flex items-center justify-between gap-3 border-b-2 border-slate-700 p-2 bg-slate-800">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							{Array.from("aaa").map((val, index) => (
								<div
									className=" w-3 h-3 bg-slate-700 rounded-full"
									key={index}
								></div>
							))}
						</div>
						<code className="font-semibold text-color-5">{language}</code>
					</div>
					<div className="flex items-center gap-2 text-slate-400 cursor-pointer transition-all duration-300 hover:text-slate-300">
						<BiCopy />
						<span>Copy code</span>
					</div>
				</div>
				<StaticCodeBox
					code={code}
					customStyle={{ background: "transparent" }}
					language={lng}
					numberStyle={{ color: "#757185" }}
					className={"h-[25rem]"}
				/>
			</div>
		</div>
	);
};

const SnippetDescription = ({ code, selectCode }) => {
	return (
		<div className="flex flex-col relative font-sans md:m-0 mt-[7rem] md:translate-y-[11rem] d:translate-y-0">
			<div className="snippet-key-board flex items-center gap-1 bg-slate-800 p-5 rounded-lg border-2 border-slate-700 -translate-y-12">
				<div
					className=" w-12 h-14 bg-[url('./assets/keyY.svg')] bg-center bg-cover flex items-center justify-center font-black text-xl pb-1 uppercase text-slate-800 bg-no-repeat cursor-pointer transition-all duration-300 hover:text-slate-50"
					onClick={() => selectCode(-1)}
				>
					<IoIosArrowBack />
				</div>
				<>
					{Array.from(code.lng === "javascript" ? "js" : code.lng).map(
						(key, index) => (
							<div
								key={index}
								className="snippet-key w-12 h-14 bg-[url('./assets/key.png')] bg-center bg-cover flex items-center justify-center font-black text-xl pb-1 uppercase text-amber-500 bg-no-repeat"
							>
								{key}
							</div>
						)
					)}
				</>
				<div
					className=" w-12 h-14 bg-[url('./assets/keyY.svg')] bg-center bg-cover flex items-center justify-center font-black text-xl pb-1 uppercase text-slate-800 bg-no-repeat cursor-pointer transition-all duration-300 hover:text-slate-50"
					onClick={() => selectCode(1)}
				>
					<IoIosArrowForward />
				</div>
			</div>
			<div className="snippet-description bg-gradient-to-l from-slate-700 via-transparent to-slate-700 rounded-lg absolute -left-24 top-24 w-[30rem] h-72 border-2 border-slate-700 flex flex-col ">
				<div className="flex items-center justify-between p-3">
					<div className="flex items-center gap-2 text-sm text-slate-300">
						<FaCode />
						<span className="capitalize font-code">{code.lng}</span>
					</div>
					<span className="text-sm text-slate-400">
						last update {code.lastUpdate}
					</span>
				</div>
				<div className="code-overflow overflow-y-scroll bg-gradient-to-l from-transparent via-slate-700 to-transparent flex-1 flex flex-col gap-4 p-6">
					<span className="font-bold text-lg text-slate-300">{code.note}</span>
					<div className="flex items-center flex-wrap gap-2">
						<>
							{code.tags.map((tag, index) => (
								<span
									key={index}
									className="flex items-center gap-2 bg-slate-600 py-1 px-2 rounded-lg text-sm text-color-5 font-semibold "
								>
									{tag}
									<span className="transition-all duration-300 hover:bg-color-5 hover:text-slate-900 cursor-pointer rounded-full">
										<MdClose />
									</span>
								</span>
							))}
						</>
						<span className="bg-slate-600 p-1 rounded-lg text-lg text-color-5 font-bold transition-all duration-300 hover:bg-color-5 hover:text-slate-900 cursor-pointer ">
							<BiPlus />
						</span>
					</div>
				</div>
				<div className=" flex items-center justify-end gap-3 p-2 text-lg">
					<span className=" bg-slate-700 rounded-full p-1 cursor-pointer">
						<BiEdit />
					</span>
					<span className=" bg-slate-700 rounded-full p-1 cursor-pointer">
						<MdStyle />
					</span>
					<span className=" bg-slate-800 rounded-full p-1 cursor-pointer">
						<BsShare />
					</span>
					<span className=" bg-slate-800 rounded-full p-1 cursor-pointer">
						<MdCopyAll />
					</span>
				</div>
			</div>
		</div>
	);
};

const codes = sampleCodes[1].codes;

const SnippetEg = () => {
	const [currCodeIndex, setCurrCodeIndex] = useState(2);

	useGSAP(() => {
		const timeline = gsap.timeline({ repeat: 0 });
		let timeout;

		const update = () => {
			timeout = setTimeout(() => {
				setCurrCodeIndex((i) => (i === 6 ? 0 : i + 1));
			}, 4000);
		};

		timeline
			.from(".snippet-example .snippet-code", {
				opacity: 0.1,
				ease: "power3.inOut",
			})
			.from(".snippet-example .snippet-key-board", {
				opacity: 0,
				ease: "power3.inOut",
			})
			.from(".snippet-example .snippet-connector", {
				opacity: 0,
				ease: "power3.inOut",
			})
			.from(".snippet-example .snippet-key", {
				opacity: 0,
				duration: 1,
				ease: "none",
				stagger: {
					amount: 0.1,
					from: "center",
				},
			})
			.from(".snippet-example .snippet-description", {
				opacity: 0,
				duration: 1,
				ease: "none",
			})
			.call(() => update());

		return () => {
			timeline.kill();
			clearTimeout(timeout);
		};
	}, [currCodeIndex]);

	const selectCode = (i) => {
		if (i > 0) {
			setCurrCodeIndex((currI) => (currI === 6 ? 0 : currI + 1));
		} else {
			setCurrCodeIndex((currI) => (currI === 0 ? 6 : currI - 1));
		}
	};

	return (
		<div className="snippet-example md:w-full d:w-auto flex d:flex-row flex-col items-center d:items-start">
			<SnippetCard
				code={codes[currCodeIndex].code}
				language={codes[currCodeIndex].lng}
			/>
			<div className="snippet-connector relative d:rotate-0 rotate-90 s:translate-y-[4rem] d:translate-y-0">
				<div className="w-2 h-5 rounded-l-full bg-slate-700 absolute -top-2 -right-0 " />
				<img src="./assets/connector.svg" alt="" width={200} />
				<div className="w-2 h-5 rounded-r-full bg-slate-700 absolute -bottom-2 -left-0 " />
			</div>
			<SnippetDescription code={codes[currCodeIndex]} selectCode={selectCode} />
		</div>
	);
};

const Snippet = ({ feature }) => {
	return (
		<section id={feature.id} className="flex flex-col overflow-x-hidden">
			<FeatureTopic feature={feature} />
			<div className=" h-[147dvh] d:h-[80vh] flex md:px-10 d:px-24 d:py-14 w-screen ">
				<Grid />
				<SnippetEg />
			</div>
		</section>
	);
};

export default Snippet;
