import "@material/web/icon/icon.js";
import("@material/web/menu/menu-item.js");
//import '@material/web/menu/menu.js';
import("@material/web/menu/menu.js").then(() => {
	console.log("manu");
	document.getElementById("usage-menu").style.display = "contents";
});

import "@material/web/fab/fab.js";
import "@material/web/progress/circular-progress.js";
import "@material/web/button/filled-tonal-button.js";
(async () => {
	await import("@material/web/dialog/dialog.js");
	await import("@material/web/ripple/ripple.js");
	await import("@material/web/button/outlined-button.js");
	await import("@material/web/iconbutton/icon-button.js");
	await import("@material/web/dialog/dialog.js");
	await import("@material/web/switch/switch.js");
	await import("@material/web/button/filled-button.js");
	await import("@material/web/iconbutton/filled-tonal-icon-button.js");
	await import("@material/web/slider/slider.js");
	await import("@material/web/list/list-item.js");
	await import("@material/web/list/list.js");
	await import("@material/web/button/text-button.js");
	await import("@material/web/textfield/outlined-text-field.js");
	await import("@material/web/textfield/filled-text-field.js");
	if ((localStorage.firstTime = "true")) {
		// import module for side effects
		await import("@material/web/tabs/primary-tab.js");
		await import("@material/web/tabs/tabs.js");
	}
})();

import { argbFromHex } from "@material/material-color-utilities/utils/string_utils.js";

import {
	applyTheme,
	themeFromSourceColor
} from "@material/material-color-utilities/utils/theme_utils.js";
function changeTheme(colorHex) {
	if (localStorage.themeColor == null || localStorage.themeColor == undefined) {
		localStorage.themeColor = "#037ffc";
		colorHex = "#037ffc";
	}
	const theme = themeFromSourceColor(argbFromHex(colorHex), [
		{
			name: "custom-1",
			value: argbFromHex("#ff0000"),
			blend: true
		}
	]);

	// Print out the theme as JSON

	// Check if the user has dark mode turned on
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	// Apply the theme to the body by updating custom properties for material tokens
	applyTheme(theme, { target: document.body, dark: systemDark });
	var themeColorMetaTag = document.querySelector("meta[name='theme-color']");
	themeColorMetaTag.setAttribute(
		"content",
		getComputedStyle(document.body).getPropertyValue("--md-sys-color-surface")
	);
}
window.changeTheme = changeTheme;
