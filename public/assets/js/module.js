import "@material/web/icon/icon.js";

window.addEventListener("load", function () {
	import("@material/web/menu/menu-item.js");
	import("@material/web/menu/menu.js").then(() => {
		document.getElementById("usage-menu").style.display = "contents";
	});
	import("@material/web/dialog/dialog.js");
	import("@material/web/labs/segmentedbuttonset/outlined-segmented-button-set.js");

	import("@material/web/labs/segmentedbutton/outlined-segmented-button.js");
	
	import("@material/web/labs/card/filled-card.js");

	
	import("@material/web/switch/switch.js");
	import("@material/web/iconbutton/filled-tonal-icon-button.js");
	import("@material/web/slider/slider.js");
	import("@material/web/list/list-item.js");
	import("@material/web/list/list.js");
	import("@material/web/button/text-button.js");
	import("@material/web/textfield/outlined-text-field.js");
	import("@material/web/textfield/filled-text-field.js");
	import("@material/web/field/outlined-field.js");
})
import "@material/web/fab/fab.js";
import "@material/web/button/outlined-button.js";
import "@material/web/progress/circular-progress.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/filled-button.js";
import "@material/web/iconbutton/icon-button.js";

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



