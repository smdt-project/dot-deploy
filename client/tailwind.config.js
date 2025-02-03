export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				d: "1346px",
				ssd: "1200px",
				sd: "1054px",
				sds: "972px",
				so: "820px",
				s: "780px",
				xs: "503px",
			},
			colors: {
				color: {
					1: "#AC6AFF",
					2: "#FFC876",
					3: "#FF776F",
					4: "#7ADB78",
					5: "#858DFF",
					6: "#FF98E2",
					7: "#5e6ad2",
					8: "#28D9E5",
				},
				stroke: {
					1: "#26242C",
				},
				n: {
					1: "#FFFFFF",
					2: "#CAC6DD",
					3: "#ADA8C3",
					4: "#757185",
					5: "#3F3A52",
					6: "#252134",
					7: "#15131D",
					8: "#000319",
					9: "#474060",
					10: "#43435C",
					11: "#1B1B2E",
					12: "#0f172ad9",
					13: "#0f172a",
					14: "#282c34",
				},
			},
			fontFamily: {
				roboto: "var(--font-roboto)",
				code: "var(--font-code)",
				grotesk: "var(--font-grotesk)",
			},
		},
	},
	plugins: [],
};
