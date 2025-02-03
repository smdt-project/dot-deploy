import { BiCodeBlock } from "react-icons/bi";
import { CgUiKit } from "react-icons/cg";
import { TbApi, TbShoppingCartCode, TbWorldCode } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import {
	AlertBox,
	AlertDialog,
	DropDown,
	ImgEditor,
	Map,
	SearchBox,
	ThemeToggle,
	ToggleGroup,
	Tooltip,
} from "../ui/SampleUIs";

export const overridingScript = `
	<script>
        (function() {
          const originalConsole = window.console;
          const messages = [];
          
          // Override console.log and console.error to capture output
          window.console = {
            log: (message) => {
              messages.push({ type: 'log', message });
              originalConsole.log(message);
              window.parent.postMessage({ type: 'log', message }, '*');
            },
            error: (message) => {
              messages.push({ type: 'error', message });
              originalConsole.error(message);
              window.parent.postMessage({ type: 'error', message }, '*');
            },
            ...originalConsole,
          };

          // Capture uncaught errors
          window.onerror = (message, source, lineno, colno, error) => {
            const errorMessage = { message, source, lineno, colno, error };
            messages.push({ type: 'error', message: errorMessage });
            window.parent.postMessage({ type: 'error', message: errorMessage }, '*');
          };
        })();
      </script>
`;

export const navLinks = [
	{
		href: "community",
		title: "Community",
		icon: <TbWorldCode />,
	},
	{
		href: "editor",
		title: "Editor",
		icon: <BiCodeBlock />,
	},
	{
		href: "",
		title: "Snippet Resources",
		icon: <BiCodeBlock />,
	},
	{
		href: "",
		title: "Ui Resources",
		icon: <BiCodeBlock />,
	},
	{
		href: "",
		title: "Features",
		icon: <img src="/dot.svg" width={20} />,
	},
	{
		href: "#contact",
		title: "Contact",
	},
	{
		href: "https://github.com/sgc/dotcode",
		title: "Source Code",
	},
];

export const sampleCodes = [
	{
		language: "react",
		codes: [
			{
				code: `
import AIHeader from './AIHeader.js';
import InputBox from './InputBox.js';
import QuickQ from './QuickQ.js';

const AI = () => {
	return (
		<div className="w-[40vw] h-fit bg-slate-800 p-5 rounded-lg flex flex-col gap-2 items-center">
			<AIHeader />
			<QuickQ />
			<InputBox />
		</div>
	);
};`,
				fileName: "AI.js",
			},
			{
				code: `
const AIHeader = () => {
	return (
		<div className="w-full flex items-center justify-between">
			<div className="flex items-center gap-2">
				<RiMenu2Fill
					size={18}
					className="text-slate-400 cursor-pointer hover:text-slate-200"
				/>
				<span className="font-black text-lg bg-gradient-to-tr from-amber-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
					SeekMore
				</span>
			</div>
			<div className="bg-amber-600 w-8 h-8 flex items-center justify-center rounded-full bg-opacity-70 border-2 border-amber-500">
				Ab
			</div>
		</div>
	);
};`,
				fileName: "AIHeader.js",
			},

			{
				code: `
const Question = ({ q }) => {
	return (
		<div className="flex flex-col gap-2 bg-slate-700 border-2 border-slate-700 bg-opacity-50 p-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 cursor-pointer">
			{q.icon}
			<span className="text-slate-400 text-sm">{q.q}</span>
		</div>
	);
};`,
				fileName: "Question.js",
			},

			{
				code: `
import qq from './constants.js';

const QuickQ = () => {
	return (
		<div className="flex items-center gap-5 my-10 px-3">
			{qq.map((q, i) => (
				<Question q={q} key={i} />
			))}
		</div>
	);
};`,
				fileName: "QuickQ.js",
			},

			{
				code: `
const InputBox = () => {
	return (
		<div className="w-full bg-slate-700 border-2 border-slate-600 rounded-full mt-10 flex items-center justify-between p-2">
			<div className=" w-5/6 flex items-center gap-3">
				<CgAttachment className="cursor-pointer text-slate-300" />
				<AiFillAudio className="cursor-pointer text-slate-300" />
				<input
					type="text"
					placeholder="Ask anything..."
					className="bg-transparent border-none outline-none placeholder:text-slate-400 placeholder:text-opacity-70 placeholder:font-semibold text-slate-200 font-semibold w-11/12"/>
			</div>
			<button className="text-slate-400 bg-slate-800 p-[4px] rounded-full transition-all duration-300 hover:bg-slate-950 hover:text-slate-100">
				<IoArrowUp />
			</button>
		</div>
	);
};`,
				fileName: "InputBox.js",
			},
			{
				code: `
import { FaCode } from "react-icons/fa6";
import { MdOutlineMarkEmailRead, MdSchool } from "react-icons/md";

const qq = [
	{
		q: "Quize me on Ethiopian history",
		icon: <MdSchool className="text-blue-500" />,
	},
	{
		icon: <FaCode className="text-purple-400" />,
		q: "python script to send email from console",
	},
	{
		icon: <MdOutlineMarkEmailRead className="text-amber-500" />,
		q: "Generate concise formal email",
	},
];`,
				fileName: "constant.js",
			},
		],
	},
	{
		codes: [
			{
				lng: "python",
				code: `
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Example usage:
print(quicksort([3, 6, 8, 10, 1, 2, 1]))
`,
				note: "Quicksort : an efficient sorting algorithm and is often used to illustrate the divide-and-conquer algorithm paradigm",
				tags: [
					"quicksort",
					"sorting-algorithm",
					"efficient-sorting",
					"divide-conquer",
				],
				lastUpdate: "June 4, 2024",
			},
			{
				lng: "node",
				code: `
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});
`,
				note: "HTTP server : creating a simple http server with node js",
				tags: [
					"http",
					"server",
					"http-server-node",
					"nodejs-server",
					"simple-server",
					"server-listen",
				],
				lastUpdate: "Feb 11, 2023",
			},
			{
				lng: "javascript",
				code: `
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Example usage:
const debouncedFunction = debounce(() => console.log('Debounced!'), 300);
window.addEventListener('resize', debouncedFunction);
`,
				note: "Debounce function: ensures that a function is not called too frequently",
				tags: [
					"debounce",
					"debounce-func",
					"avoid-frequent-call",
					"call-debounce",
				],
				lastUpdate: "Jun 2, 2024",
			},
			{
				lng: "java",
				code: `
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JdbcExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String username = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, username, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM mytable")) {

            while (rs.next()) {
                System.out.println(rs.getString("column_name"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
				note: "JDBC : how to connect an app with a database and executing a query",
				tags: [
					"java-jdbc",
					"connect-jdbc-java",
					"java-database",
					"jdbc-connector",
					"java-app-db",
				],
				lastUpdate: "Aug 2, 2023",
			},
			{
				lng: "csharp",
				code: `
using System;
using System.IO;

public class FileUtil
{
    public static string ReadFile(string path)
    {
        return File.ReadAllText(path);
    }

    // Example usage:
    public static void Main()
    {
        string content = ReadFile("example.txt");
        Console.WriteLine(content);
    }
}
`,
				note: "File : reading the contents of a file into a string.",
				tags: ["C#-file", "file-reading", "c#", "csharp", "read-file-csharp"],
				lastUpdate: "Oct 24, 2024",
			},
			{
				lng: "go",
				code: `
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
)

func main() {
    connStr := "user=username dbname=mydb sslmode=disable"
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        panic(err)
    }

    rows, err := db.Query("SELECT column_name FROM mytable")
    if err != nil {
        panic(err)
    }
    defer rows.Close()

    for rows.Next() {
        var column string
        if err := rows.Scan(&column); err != nil {
            panic(err)
        }
        fmt.Println(column)
    }
}
`,
				note: "PostgreSQL: connecting to a database and executing a query",
				tags: ["go-postgre", "go-database", "go-connect-db", "go-query"],
				lastUpdate: "Juan 23, 2019",
			},
			{
				lng: "php",
				code: `
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validate input data
    if (!empty($name) && !empty($email) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Process the data (e.g., save to database, send email, etc.)
        echo "Name: " . $name . "<br>";
        echo "Email: " . $email . "<br>";
        echo "Message: " . $message . "<br>";

        // For demonstration purposes, we'll just display a success message
        echo "<p>Form submitted successfully!</p>";
    } else {
        echo "<p>Invalid input. Please fill out the form correctly.</p>";
    }
} else {
    echo "<p>Invalid request method.</p>";
}
?>
`,
				note: "Form : a php script that processes the form data",
				tags: ["php-form", "handle-form"],
				lastUpdate: "Sept 12, 2023",
			},
		],
	},
];

export const sampleUICodes = [
	{
		uiName: "Dropdown menu",
		techs: ["react", "tailwindcss", "react-icons"],
		events: ["hover"],
		isFunctional: false,
		note: "A simple drop down menu, can be dropped down from edit menu.",
		component: <DropDown className={"sample-ui"} />,
		files: [
			{
				fileName: "Dropdown.js",
				code: `
import { BiCommand, BiCopy, BiPaste } from "react-icons/bi";
import { ImRedo2, ImUndo2 } from "react-icons/im";
import { MdDelete } from "react-icons/md";

const DropDown = ({ className }) => {
	return (
		<div className={\`\${className} bg-slate-800 p-5 rounded-lg w-64 h-fit\`}>
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
};`,
			},
			{
				fileName: "DropdownTap.js",
				code: `
const DropDownTap = ({ children }) => {
	return (
		<div className="flex items-center justify-between text-slate-300 transition-all duration-300 hover:bg-slate-700 p-1 rounded-md cursor-pointer">
			{children}
		</div>
	);
};`,
			},
		],
	},
	{
		uiName: "Animated Card",
		techs: ["react", "tailwindcss", "jsap"],
		events: ["hover"],
		isFunctional: true,
		note: "An animated company card that reveals location while hovering.",
		component: <Map className={"sample-ui"} />,
		files: [
			{
				fileName: "Map.js",
				code: `
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
		<div className={\`\${className} relative flex items-center w-[22rem] h-60\`}>
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
};`,
			},
		],
	},
	{
		uiName: "Simple Text Editor",
		techs: ["react", "tailwindcss", "react-icons"],
		events: ["hover", "click"],
		isFunctional: true,
		note: "A component to make text bold, italic or underline and to aline center, left or right.",
		component: <ToggleGroup className={"sample-ui"} />,
		files: [
			{
				fileName: "TextEditor.js",
				code: `"
import { BiBold, BiItalic, BiUnderline } from "react-icons/bi";
import EditorBtn from "./EditorBtn";
import {ImParagraphCenter, ImParagraphLeft, ImParagraphRight } from "react-icons/im";

const TextEditor = () => {
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
			className={\`\${className} h-fit bg-slate-800 text-[#6B7280] w-fit flex items-center gap-3 p-2 rounded-md\`}
		>
			<div className="flex items-center gap-2">
				<div className="flex items-center">
					<EditorBtn
						className={\`rounded-md rounded-r-[0] overflow-hidden border-2 \${
							isSelected("font-bold") ? "text-n-1 bg-gray-900" : "text-n-3"
						}\`}
						onClick={() => handleClick(1)}
					>
						<BiBold />
					</EditorBtn>
					<EditorBtn
						className={\` overflow-hidden border-2 \${
							isSelected("italic") ? "text-n-1 bg-gray-900" : "text-n-3"
						}\`}
						onClick={() => handleClick(2)}
					>
						<BiItalic />
					</EditorBtn>
					<EditorBtn
						className={\`rounded-md rounded-l-[0] overflow-hidden border-2 \${
							isSelected("underline") ? "text-n-1 bg-gray-900" : "text-n-3"
						}\`}
						onClick={() => handleClick(3)}
					>
						<BiUnderline />
					</EditorBtn>
				</div>
				<div className="flex items-center">
					<EditorBtn
						className={\`rounded-md rounded-r-[0] overflow-hidden border-2 \${
							isSelected("text-left") ? "text-n-1 bg-gray-900" : "text-n-3"
						}\`}
						onClick={() => handleClick(4)}
					>
						<ImParagraphLeft size={16} />
					</EditorBtn>
					<EditorBtn
						className={\` overflow-hidden border-2 \${
							isSelected("text-center") ? "text-n-1 bg-gray-900" : "text-n-3"
						}\`}
						onClick={() => handleClick(5)}
					>
						<ImParagraphCenter size={16} />
					</EditorBtn>
					<EditorBtn
						className={\`rounded-md rounded-l-[0] overflow-hidden border-2 \${
							isSelected("text-right") ? "text-n-1 bg-gray-900" : "text-n-3"
						}\`}
						onClick={() => handleClick(6)}
					>
						<ImParagraphRight size={16} />
					</EditorBtn>
				</div>
			</div>
			<input
				type=""
				className={\`\${className} w-[12.4rem] bg-transparent outline-none border-0\`}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
		</div>
	);
};`,
			},
			{
				fileName: "EditorBtn.js",
				code: `
const EditorBtn = ({ className, children, onClick }) => {
	return (
		<div
			className={\`\${className} border-[#374151] text-xl p-1 h-8 w-8 flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:border-gray-900 hover:text-n-1 cursor-pointer\`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default EditorBtn;`,
			},
		],
	},
	{
		uiName: "Chat Search Box",
		techs: ["react", "tailwindcss", "react-icons"],
		events: ["hover"],
		isFunctional: false,
		note: "A user searching component built like real chat apps profile displayer.",
		component: <SearchBox className={"sample-ui"} />,
		files: [
			{
				fileName: "SearchBox.js",
				code: `
import SampleProfile from "./SampleProfile";

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
			className={\`\${className} w-[26rem] h-fit bg-slate-800 rounded-lg flex flex-col gap-5 p-5\`}
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
						url={"./pp.png}
						userName={"Rabbit"}
						lastMessage={" React 😁 when you see the problem "}
						isThisUser
						haveSeen
					/>
					<SearchCard
						url={"./pp4.png"}
						userName={"Seeker"}
						lastMessage={
							" I'm waiting man, would you like to send it soon please? "
						}
						isActive
					/>
				</div>
				<SearchCard
					url={"./pp3.png}
					userName={"Bas D."}
					lastMessage={
						" last i checked you were a coder, what is happening with you comments? "
					}
					isThisUser
					isActive
				/>
				<SearchCard
					url={"./pp2.png}
					userName={"Billy the kid"}
					lastMessage={" just send me youtube link man "}
				/>
				<SearchCard
					url={"./pp1.png"}
					userName={"Gash me"}
					lastMessage={" this is astounding man, send me the link "}
					isActive
					haveSeen
					isThisUser
				/>
			</div>
		</div>
	);
};`,
			},
			{
				fileName: "SearchCard.js",
				code: `
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
					className={\`absolute right-1 bottom-0 w-3 h-3 rounded-full border-2 border-slate-800 \${
						isActive ? "bg-green-300 " : "bg-n-2"
					}\`}
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
};`,
			},
		],
	},
	{
		uiName: "Theme Toggle",
		techs: ["react", "tailwindcss", "react-icons"],
		events: ["hover"],
		isFunctional: false,
		note: "A minimized them toggling component",
		component: <ThemeToggle className={"sample-ui"} />,
		files: [
			{
				fileName: "ThemeToggle.js",
				code: `
import ThemeBtn from "./ThemeBtn";
import { BiDesktop } from "react-icons/bi";
import {CiDark, CiLight } from "react-icons/ci";

const ThemeToggle = () => {
	return (
		<div
			className="w-fit h-fit flex items-center gap-3 bg-slate-800 p-2 rounded-md"
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
};`,
			},
			{
				fileName: "ThemeBtn.js",
				code: `
const ThemeBtn = ({ children, isDefault }) => {
	const [isSelected, setIsSelected] = useState(isDefault);

	return (
		<div
			className={\`flex items-center gap-1 text-slate-400  py-1 px-2 rounded-md transition-all duration-300 hover:bg-slate-700 hover:text-slate-200 cursor-pointer \${
				isDefault ? "bg-slate-700 text-slate-200" : ""
			}\`}
		>
			{children}
		</div>
	);
};`,
			},
		],
	},
	{
		uiName: "Simple Image Editor",
		techs: ["react", "tailwindcss", "react-icons"],
		events: ["hover", "click"],
		isFunctional: true,
		note: "A simple image filtering component",
		component: <ImgEditor className={"sample-ui"} />,
		files: [
			{
				fileName: "ImgEditor.js",
				code: `
import EditingBtn from "./EditingBtn";
import { editData } from "./editData.js";

const ImgEditor = ({ className }) => {
	const [classes, setClasses] = useState("grayscale");
	const [editI, setEditI] = useState(0);

	const updateEditingClasses = (newEditingClass, index) => {
		setClasses(newEditingClass);
		setEditI(index);
	};

	return (
		<div
			className={\`\${className} w-[28rem] flex flex-col h-fit bg-slate-800 rounded-lg\`}
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
					className={\` w-full h-full z-[5] \${classes}\`}
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
};`,
			},
			{
				fileName: "EditingBtn.js",
				code: `const EditingBtn = ({ data, isSelected, onClick }) => {
	return (
		<button
			className={\`px-2 py-1 bg-slate-700 rounded-md transition-all duration-300 \${
				isSelected ? "bg-opacity-100" : " bg-opacity-20"
			} hover:bg-opacity-100\`}
			onClick={onClick}
		>
			{data.name}
		</button>
	);
};`,
			},
			{
				fileName: "editData.js",
				code: `
const editData = [
	{ name: "grayscale", className: "grayscale" },
	{ name: "blur", className: "blur" },
	{ name: "sepia", className: "sepia" },
	{ name: "invert", className: "invert" },
	{ name: "saturate", className: "saturate-200" },
	{ name: "none", className: "" },
];`,
			},
		],
	},
	{
		uiName: "Notification Popup",
		techs: ["react", "tailwindcss", "react-icons"],
		events: ["hover"],
		isFunctional: false,
		note: "A minimized notification component.",
		component: <AlertBox className={"sample-ui"} />,
		files: [
			{
				fileName: "AlertBox.js",
				code: `
import { MdClose } from "react-icons/md";

const AlertBox = () => {
	const alertBoxRef = useRef();

	return (
		<div
			ref={alertBoxRef}
			className=" w-[22rem] h-fit flex gap-5 bg-slate-800 p-6 rounded-lg"
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
};`,
			},
		],
	},

	{
		uiName: "Tooltips",
		techs: ["react", "tailwindcss", "react-icons"],
		events: ["hover"],
		isFunctional: false,
		note: "Tooltips for the 4 basic directions",
		component: <Tooltip className={"sample-ui"} />,
		files: [
			{
				fileName: "TooltipUp.js",
				code: `
const TooltipUp = () => {
	return (
		<div className="relative w-[8rem] bg-slate-800 py-2 px-4 rounded-lg mt-3">
			<div className=" absolute -top-3 left-1/2 -translate-x-1/2 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span>Tooltip Down</span>
		</div>
	);
};`,
			},
			{
				fileName: "TooltipDown.js",
				code: `
const TooltipDown = () => {
	return (
		<div className="relative w-[8rem] bg-slate-800 py-2 px-4 rounded-lg mt-3">
			<div className=" absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-180 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span>Tooltip Top</span>
		</div>
	);
};`,
			},
			{
				fileName: "TooltipLeft.js",
				code: `
const TooltipLeft = () => {
	return (
		<div className="relative w-[8rem] bg-slate-800 py-2 px-4 rounded-lg mt-3">
			<div className=" absolute top-2 -left-[0.8rem] -rotate-90 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span>Tooltip Left</span>
		</div>
	);
};`,
			},

			{
				fileName: "TooltipRight.js",
				code: `
const TooltipRight = () => {
	return (
		<div className="relative w-[8rem] bg-slate-800 py-2 px-4 rounded-lg mt-3">
			<div className=" absolute top-2 -right-[0.8rem] rotate-90 text-slate-800 -z-1">
				<TbTriangleFilled size={20} />
			</div>
			<span>Tooltip Right</span>
		</div>
	);
};`,
			},
		],
	},
	{
		uiName: "Warning Alert",
		techs: ["react", "tailwindcss", "react-icons"],
		events: ["hover"],
		isFunctional: false,
		note: "A minimized warming component.",
		component: <AlertDialog className={"sample-ui"} />,
		files: [
			{
				fileName: "AlertDialog.js",
				code: `
const AlertDialog = ({ className }) => {
	return (
		<div
			className=" w-[22rem] h-fit bg-slate-800 border-[1px] border-pink-500 transition-all duration-300 hover:border-opacity-35 rounded-lg p-5 flex flex-col gap-5"
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
};`,
			},
		],
	},
];

export const featuresContent = [
	{
		id: "integratedEditor",
		icon: <BiCodeBlock />,
		tag: "Code with ease",
		title: "Integrated Code Editor",
		detail:
			"An intuitive and user-friendly code editor designed for both beginners and advanced developers, supporting syntax highlighting, code completion, and real-time error checking.",
		hasBtn: true,
		btnLink: "/editor/dotcode",
		btnText: "Try for free",
		className: "border-2 border-color-1 bg-color-1",
		btnClass: "bg-color-1",
		textClass: "text-color-1",
	},
	{
		id: "multilingualSupport",
		icon: <TbShoppingCartCode />,
		tag: "Write in Any language",
		title: "Multilingual support",
		detail:
			"Supports a wide range of front-end and back-end technologies, allowing you to write, test, and manage code in languages like HTML, CSS, JavaScript, React, Vue, Node.js, Python, and more.",
		hasBtn: true,
		btnLink: "/editor/dotcode",
		btnText: "Learn more",
		className: "border-2 border-color-3 bg-color-3",
		btnClass: "bg-color-3",
		textClass: "text-color-3",
	},
	{
		id: "snippetMgt",
		icon: <VscCode />,
		tag: "Organize Your lines of code",
		title: "Code Snippet Management",
		detail:
			"Efficiently manage and organize code snippets for both front-end and back-end development. Save, categorize, and quickly retrieve reusable code blocks.",
		hasBtn: true,
		btnLink: "/editor/dotcode",
		btnText: "Start snippeting",
		className: "border-2 border-color-6 bg-color-6",
		btnClass: "bg-color-6",
		textClass: "text-color-6",
	},
	{
		id: "componentMgt",
		icon: <CgUiKit />,
		tag: "Build with Components",
		title: "UI Component Management",
		detail:
			"Create, manage, and reuse stateful and stateless UI components. Easily integrate functional UI elements into your projects.",
		hasBtn: true,
		btnLink: "/editor/dotcode",
		btnText: "My first Component",
		className: "border-2 border-color-4 bg-color-4",
		btnClass: "bg-color-4",
		textClass: "text-color-4",
	},
	{
		id: "communityFeature",
		icon: <TbWorldCode />,
		tag: "Collaborate and Share",
		title: "Resourceful community",
		detail:
			"Join a vibrant community of developers. Share your snippets and components, and use contributions from others to enhance your projects.",
		hasBtn: true,
		btnLink: "/community",
		btnText: "Visit community",
		className: "border-2 border-color-8 bg-color-8",
		btnClass: "bg-color-8",
		textClass: "text-color-8",
	},
	{
		id: "apiAccess",
		icon: <TbApi />,
		tag: "Connect and extend",
		title: "API Access",
		detail:
			"Leverage our API to access publicly shared community data, including UI components, snippet source codes, and user information. Integrate DotCode features into your own applications.",
		hasBtn: true,
		btnLink: "https://documenter.getpostman.com/view/38037883/2sAY4rG5vR",
		btnText: "Learn More",
		className:
			"border-2 border-color-2 bg-gradient-to-l from-color-2 to-color-5",
		btnClass: "bg-color-2",
		textClass: "text-color-2",
	},
];

export const footerContents = [
	{
		category: "Services",
		links: [
			{
				name: "Features",
				link: "#features",
			},
			{
				name: "UI Components",
				link: "#components",
			},
			{
				name: "Code Snippets",
				link: "#snippets",
			},
			{
				name: "Quick Search",
				link: "/community",
			},
		],
	},
	{
		category: "About Us",
		links: [
			{
				name: "About",
				link: "/about",
			},
			{
				name: "Testimonials",
				link: "#testimonials",
			},
			{
				name: "Contact us",
				link: "#contact",
			},
		],
	},
	{
		category: "Resources",
		links: [
			{
				name: "Community",
				link: "/community",
			},
			{
				name: "Privacy Policy",
				link: "/policy",
			},
			{
				name: "Terms of services",
				link: "/terms",
			},
		],
	},
	{
		category: "Developers",
		links: [
			{
				name: "API",
				link: "/api",
			},
			{
				name: "GitHub",
				link: "#",
			},
			{
				name: "README",
				link: "#",
			},
		],
	},
];
