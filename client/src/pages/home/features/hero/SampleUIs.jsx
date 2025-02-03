import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import {
	BiBold,
	BiCheckDouble,
	BiCommand,
	BiCopy,
	BiDesktop,
	BiItalic,
	BiPaste,
	BiUnderline,
} from "react-icons/bi";
import { BsDatabaseAdd } from "react-icons/bs";
import { CiDark, CiLight, CiPickerHalf } from "react-icons/ci";
import { FaPaintBrush } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import {
	ImParagraphCenter,
	ImParagraphLeft,
	ImParagraphRight,
	ImRedo2,
	ImUndo2,
} from "react-icons/im";
import { IoIosArrowDown, IoMdCut } from "react-icons/io";
import {
	MdClose,
	MdCreateNewFolder,
	MdDelete,
	MdSearch,
	MdTipsAndUpdates,
} from "react-icons/md";
import { PiCoatHangerFill } from "react-icons/pi";
import { TbDatabaseSearch, TbTriangleFilled } from "react-icons/tb";
import { VscLiveShare } from "react-icons/vsc";
import Button from "../../../../ui/Button";
import Light from "../../../../ui/Light";

const Toggle = ({ selected }) => {
	const [isSelected, setIsSelected] = useState(selected);

	return (
		<div
			className={`toggle transition-all duration-400 w-12 h-6 rounded-full flex items-center ${
				isSelected ? "bg-color-5 justify-end" : "bg-n-1 bg-opacity-20"
			}`}
			onClick={() => setIsSelected((isSelected) => !isSelected)}
		>
			<div
				className={`w-4 h-4 bg-n-1 rounded-full transition-all duration-400 hover:scale-[1.1] ${
					isSelected ? "mr-1" : "ml-1"
				}`}
			></div>
		</div>
	);
};

const ToggleGroup = () => {
	const [text, setText] = useState("text editor component");
	const [className, setClassName] = useState("text-left italic text-base");

	const updateClassName = (newClassName, i) => {
		const classes = className
			.split(" ")
			.filter((existedClassName) => existedClassName !== newClassName);

		if (classes.length < className.split(" ").length) {
			setClassName(() => classes.join(" "));
		} else {
			setClassName(className + " " + newClassName);
		}
	};

	const removeClass = (classA, classB) => {
		setClassName((className) =>
			className
				.split(" ")
				.filter(
					(existedClassName) =>
						existedClassName !== classA && existedClassName !== classB
				)
				.join(" ")
		);
	};

	const handleClick = (index) => {
		switch (index) {
			case 1:
				updateClassName("font-bold", 1);
				break;
			case 2:
				updateClassName("italic", 2);
				break;
			case 3:
				updateClassName("underline", 3);
				break;
			case 4:
				updateClassName("text-left", 4);
				removeClass("text-center", "text-right");
				break;
			case 5:
				updateClassName("text-center", 5);
				removeClass("text-right", "text-left");
				break;
			case 6:
				updateClassName("text-right", 6);
				removeClass("text-left", "text-center");
				break;
		}
	};

	const isSelected = (name) => {
		const classes = className
			.split(" ")
			.filter((existedClassName) => existedClassName !== name);

		if (classes.length < className.split(" ").length) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div
			className={`${className} h-fit bg-slate-800 text-[#6B7280] w-fit flex items-center gap-3 p-2 rounded-md`}
		>
			<div className="flex items-center gap-2">
				<div className="flex items-center">
					<ToggleBtn
						className={`rounded-md rounded-r-[0] overflow-hidden border-2 ${
							isSelected("font-bold") ? "text-n-1 bg-gray-900" : "text-n-3"
						}`}
						onClick={() => handleClick(1)}
					>
						<BiBold />
					</ToggleBtn>
					<ToggleBtn
						className={` overflow-hidden border-2 ${
							isSelected("italic") ? "text-n-1 bg-gray-900" : "text-n-3"
						}`}
						onClick={() => handleClick(2)}
					>
						<BiItalic />
					</ToggleBtn>
					<ToggleBtn
						className={`rounded-md rounded-l-[0] overflow-hidden border-2 ${
							isSelected("underline") ? "text-n-1 bg-gray-900" : "text-n-3"
						}`}
						onClick={() => handleClick(3)}
					>
						<BiUnderline />
					</ToggleBtn>
				</div>
				<div className="flex items-center">
					<ToggleBtn
						className={`rounded-md rounded-r-[0] overflow-hidden border-2 ${
							isSelected("text-left") ? "text-n-1 bg-gray-900" : "text-n-3"
						}`}
						onClick={() => handleClick(4)}
					>
						<ImParagraphLeft size={16} />
					</ToggleBtn>
					<ToggleBtn
						className={` overflow-hidden border-2 ${
							isSelected("text-center") ? "text-n-1 bg-gray-900" : "text-n-3"
						}`}
						onClick={() => handleClick(5)}
					>
						<ImParagraphCenter size={16} />
					</ToggleBtn>
					<ToggleBtn
						className={`rounded-md rounded-l-[0] overflow-hidden border-2 ${
							isSelected("text-right") ? "text-n-1 bg-gray-900" : "text-n-3"
						}`}
						onClick={() => handleClick(6)}
					>
						<ImParagraphRight size={16} />
					</ToggleBtn>
				</div>
			</div>
			<input
				type=""
				className={`${className} w-[12.4rem] bg-transparent outline-none border-0`}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
		</div>
	);
};

const ToggleBtn = ({ className, children, onClick }) => {
	return (
		<div
			className={`${className} border-[#374151] text-xl p-1 h-8 w-8 flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:border-gray-900 hover:text-n-1 cursor-pointer`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

const Map = ({ className }) => {
	const revealMap = () => {
		gsap.to(".map-cover", {
			opacity: 0,
			duration: 0.5,
			ease: "none",
		});
		gsap.to(".map", {
			scale: 1.5,
			duration: 1,
			ease: "none",
		});

		gsap.to(".origin-letter", {
			opacity: 1,
			duration: 1,
			ease: "none",
			stagger: 0.06,
		});
	};

	const hideMap = () => {
		gsap.to(".origin-letter", {
			opacity: 0,
			duration: 1,
			ease: "none",
			stagger: 0.06,
		});

		gsap.to(".map-cover", {
			opacity: 1,
			duration: 0.5,
			ease: "none",
		});

		gsap.to(".map", {
			scale: 1,
			duration: 0.5,
			ease: "none",
		});
	};

	return (
		<div className={`${className} relative flex items-center w-[22rem] h-60`}>
			<div className=" absolute w-[22rem] h-60 rounded-lg top-0 left-0 z-[-2] flex flex-col items-center bg-n-12 overflow-hidden">
				<img
					src="./assets/map.png"
					alt=""
					className=" map w-full h-full -mb-10"
				/>
				<span className="origin text-n-2 font-code">
					{Array.from("Addis Ababa, Ethiopia").map((letter, index) => (
						<span className="origin-letter opacity-0" key={index}>
							{letter}
						</span>
					))}
				</span>
			</div>
			<div
				className="map-cover w-[22rem] h-full flex flex-col justify-evenly p-4 bg-n-12 text-n-2 rounded-md transition-all duration-600"
				onMouseEnter={() => revealMap()}
				onMouseLeave={() => hideMap()}
			>
				<div className="flex flex-col gap-1 1-full">
					<div className="flex text-lg items-center gap-1 text-color-4">
						<PiCoatHangerFill className=" -rotate-90 " size={22} />
						<span>Hanger--Codes</span>
					</div>
					<span className="text-sm text-n-3">
						We develop solutions as they are the best for given problem and as
						they are at their version.
					</span>
				</div>
				<span className="text-sm text-n-4">____since 2003.</span>
			</div>
		</div>
	);
};

const SearchBox = ({ className }) => {
	useGSAP(() => {
		gsap.to(".active-user-pointer", {
			scale: 2,
			duration: 1,
			repeat: -1,
			yoyo: true,
			ease: "none",
		});
	}, []);

	return (
		<div
			className={`${className} w-[26rem] h-fit bg-slate-800 rounded-lg flex flex-col gap-5 p-5`}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-n-3 text-lg border-b-[1px] border-slate-700 w-4/5 py-1">
					<MdSearch size={22} />
					<input
						type="text"
						className="bg-transparent outline-none border-0 text-slate-300"
						placeholder="Search chats ..."
						readOnly
					/>
				</div>
				<div className="flex items-center gap-2 relative">
					<div className="active-user-pointer absolute right-1 bottom-0 w-2 h-2 rounded-full bg-green-300 border-[1px] border-slate-800 scale-[0.3]"></div>
					<div className="bg-slate-600 w-7 h-7 flex items-center justify-center text-n-1 rounded-full">
						3
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-2 border-b-[2px] border-slate-700 pb-2">
					<span className="text-sm text-slate-400">recent searches</span>
					<SearchCard
						url={
							"https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=600"
						}
						userName={"Rabbit"}
						lastMessage={" React 😁 when you see the problem "}
						isThisUser
						haveSeen
					/>
					<SearchCard
						url={
							"https://images.pexels.com/photos/725255/pexels-photo-725255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
						}
						userName={"Seeker"}
						lastMessage={
							" I'm waiting man, would you like to send it soon please? "
						}
						isActive
					/>
				</div>
				<SearchCard
					url={
						"https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600"
					}
					userName={"Bas D."}
					lastMessage={
						" last i checked you were a coder, what is happening with you comments? "
					}
					isThisUser
					isActive
				/>
				<SearchCard
					url={
						"https://images.pexels.com/photos/40815/youth-active-jump-happy-40815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					}
					userName={"Billy the kid"}
					lastMessage={" just send me youtube link man "}
				/>
				<SearchCard
					url={
						"https://images.pexels.com/photos/17483848/pexels-photo-17483848/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v.png?auto=compress&cs=tinysrgb&w=600"
					}
					userName={"Gash me"}
					lastMessage={" this is astounding man, send me the link "}
					isActive
					haveSeen
					isThisUser
				/>
			</div>
		</div>
	);
};

const SearchCard = ({
	url,
	userName,
	lastMessage,
	isActive,
	isThisUser,
	haveSeen,
}) => {
	return (
		<div className="flex items-center gap-2 p-1 rounded-md transition-all duration-300 hover:bg-slate-700 cursor-pointer">
			<div className="relative">
				<img src={url} alt="" className="w-10 h-10 rounded-full" />
				<div
					className={`absolute right-1 bottom-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
						isActive ? "bg-green-300 " : "bg-n-2"
					}`}
				></div>
			</div>
			<div className="flex flex-col font-[400] w-3/4">
				<span className="text-[0.9rem] text-slate-200">{userName}</span>
				<div className="text-sm text-slate-400 flex items-center justify-between">
					<div className="max-w-44 text-ellipsis line-clamp-1">
						{isThisUser ? <span>you: </span> : ""}
						{lastMessage}
					</div>
					{isThisUser && haveSeen ? <BiCheckDouble size={19} /> : ""}
					{!isThisUser && !haveSeen ? (
						<span className="text-color-4 text-[0.7rem]">new</span>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

const TooltipUp = () => {
	return (
		<div className="relative w-[8rem] bg-slate-800 py-2 px-4 rounded-lg mt-3">
			<div className=" absolute -top-3 left-1/2 -translate-x-1/2 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span>Tooltip Down</span>
		</div>
	);
};
const TooltipDown = () => {
	return (
		<div className="relative w-[8rem] bg-slate-800 py-2 px-4 rounded-lg mt-3">
			<div className=" absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-180 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span>Tooltip Top</span>
		</div>
	);
};
const TooltipLeft = () => {
	return (
		<div className="relative w-[8rem] bg-slate-800 py-2 px-4 rounded-lg mt-3">
			<div className=" absolute top-2 -left-[0.8rem] -rotate-90 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span>Tooltip Left</span>
		</div>
	);
};
const TooltipRight = () => {
	return (
		<div className="relative w-[8rem] bg-slate-800 py-2 px-4 rounded-lg mt-3">
			<div className=" absolute top-2 -right-[0.8rem] rotate-90 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span>Tooltip Right</span>
		</div>
	);
};

const Tooltip = ({ className }) => {
	return (
		<div
			className={`${className} w-[22rem] flex flex-wrap items-center justify-center gap-7 relative py-2 px-4 rounded-lg mt-3`}
		>
			<TooltipDown />
			<TooltipLeft />
			<TooltipRight />
			<TooltipUp />
		</div>
	);
};

const DropDown = ({ className }) => {
	return (
		<div className={`${className} bg-slate-800 p-5 rounded-lg w-64 h-fit`}>
			<div className="flex flex-col gap-1 border-b-2 border-slate-700 pb-2">
				<DropDownTap>
					<div className="flex items-center gap-2">
						<ImUndo2 className="text-slate-400" />
						<span>Undo</span>
					</div>
					<div className="flex items-center gap-1 text-slate-400">
						<BiCommand size={15} /> + z
					</div>
				</DropDownTap>
				<DropDownTap>
					<div className="flex items-center gap-2">
						<ImRedo2 className="text-slate-400" />
						<span>Redo</span>
					</div>
					<div className="flex items-center gap-1 text-slate-400">
						<BiCommand size={15} /> + y
					</div>
				</DropDownTap>
			</div>
			<div className="flex flex-col gap-1 border-b-2 border-slate-700 py-2">
				<DropDownTap>
					<div className="flex items-center gap-2">
						<IoMdCut className="text-slate-400" />
						<span>Cut</span>
					</div>
					<div className="flex items-center gap-1 text-slate-400">
						<BiCommand size={15} /> + x
					</div>
				</DropDownTap>
				<DropDownTap>
					<div className="flex items-center gap-2">
						<BiCopy className="text-slate-400" />
						<span>Copy</span>
					</div>
					<div className="flex items-center gap-1 text-slate-400">
						<BiCommand size={15} /> + c
					</div>
				</DropDownTap>
				<DropDownTap>
					<div className="flex items-center gap-2">
						<BiPaste className="text-slate-400" />
						<span>Paste</span>
					</div>
					<div className="flex items-center gap-1 text-slate-400">
						<BiCommand size={15} /> + v
					</div>
				</DropDownTap>
			</div>
			<div className="flex flex-col gap-1 pt-2">
				<DropDownTap>
					<div className="flex items-center text-pink-500 gap-2">
						<MdDelete />
						<span>Delete</span>
					</div>
					<div className="flex items-center gap-1 text-pink-500">
						<BiCommand size={15} /> <FiDelete size={15} />
					</div>
				</DropDownTap>
			</div>
		</div>
	);
};

const DropDownTap = ({ children }) => {
	return (
		<div className="flex items-center justify-between text-slate-300 transition-all duration-300 hover:bg-slate-700 p-1 rounded-md cursor-pointer">
			{children}
		</div>
	);
};

const AlertBox = ({ className }) => {
	const alertBoxRef = useRef();

	return (
		<div
			ref={alertBoxRef}
			className={`${className} w-[22rem] h-fit flex gap-5 bg-slate-800 p-6 rounded-lg`}
		>
			<span className="text-color-1">
				<MdTipsAndUpdates size={33} />
			</span>
			<div className="flex flex-col items-start gap-6">
				<div className="flex flex-col gap-2">
					<span className="font-bold text-slate-300">
						New update available!
					</span>
					<span className="text-sm text-slate-400">
						Some awesome features are added to this version of{" "}
						<img src="./dot.svg" className="w-5 grayscale inline" />, update it
						and enjoy your work with enhanced performance and friendly user
						interface.
					</span>
				</div>
				<Button
					className={
						"text-color-1 font-bold transition-all duration-300 hover:text-opacity-80"
					}
				>
					Update Now
				</Button>
			</div>
			<span className="text-n-3 transition-all duration-300 hover:text-n-1">
				<MdClose size={22} />
			</span>
		</div>
	);
};

const AlertDialog = ({ className }) => {
	return (
		<div
			className={`${className} w-[22rem] h-fit bg-slate-800 border-[1px] border-pink-500 transition-all duration-300 hover:border-opacity-35 rounded-lg p-5 flex flex-col gap-5`}
		>
			<div className="flex flex-col gap-1">
				<span className="text-slate-100">Are you absolutely sure?</span>
				<span className="text-slate-400 text-sm">
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</span>
			</div>
			<div className="flex items-center justify-end gap-3">
				<Button
					className={
						"bg-slate-700 py-1 px-3 rounded-md transition-all duration-300 hover:bg-slate-600"
					}
				>
					Cancel
				</Button>
				<Button
					className={
						"bg-pink-800 py-1 px-3 rounded-md transition-all duration-300 hover:bg-pink-700"
					}
				>
					Yes, Delete Account
				</Button>
			</div>
		</div>
	);
};

const ThemeToggle = ({ className }) => {
	return (
		<div
			className={`${className} w-fit h-fit flex items-center gap-3 bg-slate-800 p-2 rounded-md`}
		>
			<ThemeBtn>
				<CiLight />
				<span>Light</span>
			</ThemeBtn>
			<ThemeBtn isDefault>
				<CiDark />
				<span>Dark</span>
			</ThemeBtn>
			<ThemeBtn>
				<BiDesktop />
				<span>System</span>
			</ThemeBtn>
		</div>
	);
};

const ThemeBtn = ({ children, isDefault }) => {
	const [isSelected, setIsSelected] = useState(isDefault);

	return (
		<div
			className={`flex items-center gap-1 text-slate-400  py-1 px-2 rounded-md transition-all duration-300 hover:bg-slate-700 hover:text-slate-200 cursor-pointer ${
				isDefault ? "bg-slate-700 text-slate-200" : ""
			}`}
		>
			{children}
		</div>
	);
};

const ProfileList = ({ className }) => {
	return (
		<div className={`${className} w-[10rem] h-fit flex items-center mr-4`}>
			<SampleProfile
				profileName={"Rabbit"}
				url={
					"https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=600"
				}
			/>
			<SampleProfile
				profileName={"Seeker"}
				url={
					"https://images.pexels.com/photos/725255/pexels-photo-725255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
				}
			/>
			<SampleProfile
				profileName={"Bas"}
				url={
					"https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600"
				}
			/>
			<SampleProfile
				profileName={"Billy"}
				url={
					"https://images.pexels.com/photos/40815/youth-active-jump-happy-40815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
				}
			/>
			<SampleProfile
				profileName={"Gash"}
				url={
					"https://images.pexels.com/photos/17483848/pexels-photo-17483848/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v.png?auto=compress&cs=tinysrgb&w=600"
				}
			/>
		</div>
	);
};

const SampleProfile = ({ profileName, url }) => {
	const [isHovered, setIsHovered] = useState(false);

	useGSAP(() => {
		if (isHovered) {
			gsap.to(`.${profileName}`, {
				opacity: 1,
				y: 10,
				duration: 1,
				ease: "bounce.out",
			});
		} else {
			gsap.to(`.${profileName}`, {
				opacity: 0,
				y: -10,
			});
		}
	}, [isHovered]);

	return (
		<div
			className="flex flex-col items-center rounded-full -mr-4 relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<img
				src={url}
				alt=""
				className="w-12 h-12 bg-slate-800 rounded-full border-2 border-slate-500 transition-all duration-500 hover:z-20 hover:scale-[1.2] hover:border-slate-300"
			/>
			<div
				className={`${profileName} absolute -bottom-12 flex flex-col items-center z-[-2] opacity-0`}
			>
				<div className="profile-string w-1 h-6 bg-slate-800"></div>
				<span className="profile-name bg-slate-800 px-2 py-1 rounded-md -translate-y-4">
					{profileName}
				</span>
			</div>
		</div>
	);
};

const editData = [
	{ name: "grayscale", className: "grayscale" },
	{ name: "blur", className: "blur" },
	{ name: "sepia", className: "sepia" },
	{ name: "invert", className: "invert" },
	{ name: "saturate", className: "saturate-200" },
	{ name: "none", className: "" },
];

const ImgEditor = ({ className }) => {
	const [classes, setClasses] = useState("grayscale");
	const [editI, setEditI] = useState(0);

	const updateEditingClasses = (newEditingClass, index) => {
		setClasses(newEditingClass);
		setEditI(index);
	};

	return (
		<div
			className={`${className} w-[28rem] flex flex-col h-fit bg-slate-800 rounded-lg`}
		>
			<div className="flex items-center gap-2 p-2">
				<span className=" text-sm text-slate-300">Filter an image</span>
				<span className=" text-sm text-slate-500">
					hover to compare the change
				</span>
			</div>
			<div className="relative rounded-lg h-52 w-[23rem] overflow-hidden self-center">
				<img
					src="https://images.pexels.com/photos/206388/pexels-photo-206388.jpeg?auto=compress&cs=tinysrgb&w=600"
					alt=""
					className={` w-full h-full z-[5] ${classes}`}
				/>
			</div>
			<div className="flex items-center justify-evenly py-2 ">
				{editData.map((data, index) => (
					<EditingBtn
						data={data}
						key={index}
						isSelected={editI === index}
						onClick={() => updateEditingClasses(data.className, index)}
					/>
				))}
			</div>
		</div>
	);
};

const EditingBtn = ({ data, isSelected, onClick }) => {
	return (
		<button
			className={`px-2 py-1 bg-slate-700 rounded-md transition-all duration-300 ${
				isSelected ? "bg-opacity-100" : " bg-opacity-20"
			} hover:bg-opacity-100`}
			onClick={onClick}
		>
			{data.name}
		</button>
	);
};

const fieldLists = [
	"Back-end Developer",
	"Computer Engineering",
	"Computer Science",
	"Flutter Developer",
	"Front-end Developer",
	"Software Engineering",
];

const SelectionBox = ({ className }) => {
	const [selectedValue, setSelectedValue] = useState("Computer Science");
	const [isSelecting, setIsSelecting] = useState(false);

	const handleSelecting = (field) => {
		setSelectedValue(field);
		setIsSelecting(false);
	};

	return (
		<div className={`${className} flex flex-col gap-1 rounded-lg w-72`}>
			<span className="text-slate-400 px-5 py-3 bg-slate-800 rounded-t-lg">
				Choose your field of study
			</span>
			<div
				className={`flex items-center justify-between px-5 py-2 bg-slate-800  ${
					isSelecting ? " border-[1px] border-slate-600" : "rounded-b-lg "
				}`}
			>
				<span className="text-slate-300">{selectedValue}</span>
				<button
					className="flex items-center justify-center text-slate-400 bg-slate-700 h-5 w-5 rounded-md"
					onClick={() => setIsSelecting((isSelecting) => !isSelecting)}
				>
					<IoIosArrowDown
						className={` transition-all duration-300 ${
							isSelecting ? "rotate-180" : ""
						}`}
					/>
				</button>
			</div>

			{isSelecting && (
				<div className="flex flex-col gap-1 bg-slate-800 rounded-b-lg p-1">
					{fieldLists.map((field, index) => (
						<span
							className={`flex items-center justify-between  px-2 py-1 text-center rounded-sm transition-all duration-300 hover:bg-gray-900 hover:text-slate-200 cursor-pointer ${
								selectedValue === field
									? "bg-gray-900 text-slate-200"
									: "bg-slate-700 text-slate-300"
							}`}
							key={index}
							onClick={() => handleSelecting(field)}
						>
							<span>{field}</span>
							{selectedValue === field && <GiCheckMark />}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

gsap.registerPlugin(ScrollTrigger);

const SampleUIs = () => {
	const uiContainerRef = useRef();

	return (
		<div
			ref={uiContainerRef}
			className="md:absolute sm:-right-72 sm:top-72 so:-right-64 so:top-52 sds:-right-44 sds:top-36 ssd:-right-32 d:right-0 ssd:top-18 d:top-0 flex flex-col items-end gap-8 md:pr-20 md:w-1/2 w-full opacity-80 md:translate-x-0 translate-x-20 md:scale-100 sm:scale-90 scale-75"
		>
			<div className="flex items-end gap-8">
				<div className="flex flex-col items-end gap-8">
					<Toggle />
					<Button className={"w-[9rem]"} type={"elevated"}>
						Button y
					</Button>
				</div>
				<AlertDialog />
			</div>
			<div className="flex items-end gap-8">
				<Toggle selected />
				<Map />
				<DropDown />
			</div>
			<div className="flex items-center gap-8">
				<TooltipUp />
				<ProfileList />
				<ThemeToggle />
				<ToggleGroup />
			</div>
			<div className="flex items-start gap-8">
				<AlertBox />
				<div className="flex flex-col items-end gap-8">
					<ImgEditor />
					<SelectionBox />
				</div>
				<SearchBox />
			</div>
		</div>
	);
};

const compos = () => {
	return (
		<>
			<div className="button-light relative">
				<Light
					width={250}
					className={
						"lighted-text -top-[10rem] -left-6 -translate-y-20 -rotate-12 text-color-2"
					}
				>
					<span>Design</span>
					<FaPaintBrush />
				</Light>
			</div>
			<div className="relative">
				<Light
					width={250}
					svgClassName={"rotate-180"}
					className={
						"lighted-text -bottom-[11rem] left-6 translate-y-20 -rotate-12 text-color-4"
					}
				>
					<span>Create</span>
					<MdCreateNewFolder />
				</Light>
			</div>

			<div className="toggle-light relative">
				<Light
					width={250}
					className={
						"lighted-text -top-[10rem] right-4 -translate-y-20 -rotate-12 text-color-6"
					}
				>
					<span>Store</span> <BsDatabaseAdd />
				</Light>
			</div>

			<div className="relative">
				<Light
					width={250}
					svgClassName={"rotate-180"}
					className={
						"lighted-text -bottom-[11rem] left-6 translate-y-20 -rotate-12 text-color-8"
					}
				>
					<span>Reuse</span>
					<TbDatabaseSearch />
				</Light>
			</div>
			<div className="relative">
				<Light
					width={250}
					className={
						"lighted-text -top-[6rem] right-4 -translate-y-20 -rotate-12 text-color-3"
					}
				>
					<span>Share</span>
					<VscLiveShare />
				</Light>
			</div>

			<div className="relative h-full flex items-center justify-center">
				<Light
					width={550}
					text={"Copy and paste"}
					svgClassName={"rotate-180"}
					className={
						"lighted-text bottom-[6rem] left-6 translate-y-20 -rotate-12 text-color-1"
					}
				>
					<span>Copy & Paste</span>
					<CiPickerHalf />
				</Light>
			</div>
			<div className="relative h-full flex items-center justify-center pl-24">
				<div className="absolute right-0  bottom-[56.7%] w-10 h-10 bg-color-1 rounded-full bg-blend-difference"></div>
				<span className=" bg-gradient-to-l from-color-1 to-color-3 text-6xl font-bold  px-5 py-3 rounded-lg text-transparent bg-clip-text">
					Manage
				</span>
				<span className="bg-gradient-to-l from-color-2 to-color-4  text-6xl font-bold  px-5 py-3 rounded-lg -translate-y-[3.3rem] -translate-x-10">
					Components
				</span>
				<span className="bg-gradient-to-l from-color-6 to-color-5  text-6xl font-bold  px-5 py-3 rounded-lg translate-y-[0.8rem] -translate-x-[15rem]">
					Snippets
				</span>
				<span className="bg-gradient-to-l from-color-3 to-color-8 bg-clip-text text-transparent text-6xl font-bold  px-5 py-3 rounded-lg -translate-x-[12rem]">
					Effortlessly!
				</span>
			</div>
		</>
	);
};

export default SampleUIs;
export {
	AlertBox,
	AlertDialog,
	DropDown,
	ImgEditor,
	Map,
	ProfileList,
	SearchBox,
	ThemeToggle,
	Toggle,
	ToggleGroup,
	Tooltip,
};
