
import "https://esm.run/@material/web/all.js"
import "https://esm.run/@material/web/labs/card/filled-card.js"


import {
	applyTheme,
	themeFromSourceColor,
	Hct,
	argbFromHex,
	hexFromArgb
} from "@material/material-color-utilities/index.js";
var clrThm;
try {
	clrThm = localStorage["seed-color"].split(",");
} catch (error) {
	clrThm = [267, 100];
}
changeTheme(clrThm[0], clrThm[1]);

function changeTheme(hue, chroma) {
	const hct = Hct.from(hue, chroma, 50);
	let colorHex = hct.toInt();

	const seedColor = localStorage["seed-color"] || "267,100";
	let clrThm = seedColor.split(",");
	colorHex = Hct.from(clrThm[0], clrThm[1], 50).toInt();

	const theme = themeFromSourceColor(colorHex, [
		{
			name: "custom-1",
			value: argbFromHex("#ff0000"),
			blend: true
		}
	]);
	localStorage.mode = localStorage.mode || "sys";
	let systemDark =
		localStorage.mode === "dark" ||
		(localStorage.mode !== "light" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);
	applyTheme(theme, { target: document.body, dark: systemDark });
	const themeColorMetaTag = document.querySelector("meta[name='theme-color']");
	themeColorMetaTag.setAttribute(
		"content",
		getComputedStyle(document.body).getPropertyValue("--md-sys-color-surface")
	);

	return buildGradient(hue);
}
function buildGradient(hue) {
	const numStops = 100;
	const colors = Array.from({ length: numStops }, (_, i) => {
		const chroma = (150 / numStops) * i;
		const hct = Hct.from(hue, chroma, 50);
		return hexFromArgb(hct.toInt());
	});

	const colorStops = colors.map((color, i) => `${color} ${i}%`);
	const linearGradientString = `linear-gradient(to right, ${colorStops.join(", ")})`;

	return linearGradientString;
}
window.changeTheme = changeTheme;
window.buildGradient = buildGradient;



