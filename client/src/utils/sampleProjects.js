import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";

export const sampleProjects = [
	{
		name: "glassmorphism search box",
		files: [
			{
				fileName: "index.html",
				lng: "html",
				mode: html(),
				code: `
<div class="search-box">
    <input type="text" placeholder="Search here..." />
</div>
                `,
			},
			{
				fileName: "style.css",
				lng: "CSS",
				mode: css(),
				code: `
.search-box input {
    background: transparent;
    color: #fff;
    font-size: 17px;
    font-weight: 700;
}

.search-box input::placeholder {
    color: #fff;
    text-opacity: 0.7;
}
`,
			},
			{
				fileName: "script.js",
				lng: "Javascript",
				mode: javascript(),
				code: `
'strict mode';
const input = document.selectElementByTag('input');
                
const handleChange = (value) => {
    return value;
}
                `,
			},
		],
	},
];
