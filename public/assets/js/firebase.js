// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
	getDatabase,
	ref,
	child,
	get,
	update,
	onValue
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyBrxvJ-fs7wtfnsLzOy6WI_1J_CMHPXpoU",
	authDomain: "tarock-counter.web.app",
	projectId: "tarock-counter",
	storageBucket: "tarock-counter.appspot.com",
	messagingSenderId: "1058014595030",
	appId: "1:1058014595030:web:3f9c1a0095ef78276d4677",
	measurementId: "G-K7NFBYQN0F",
	databaseURL: "https://tarock-counter-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const signInButton = document.getElementById("signInGoogle");
const analytics = getAnalytics(app);
const signInMessage = document.getElementById("signInMessage");
var uid = null;

export function deleteAllDataF() {
	if (sessionStorage.uid !== null && navigator.onLine) {
		userSignOut();
		setTimeout(() => {
			localStorage.clear();
		}, 500);

		const db = getDatabase();

		const updates = {};
		updates["users/" + sessionStorage.uid] = {};

		return update(ref(db), updates);
	}
}
window.deleteAllDataF = deleteAllDataF;

const userSignIn = async () => {
	if (
		sessionStorage.uid !== null &&
		sessionStorage.uid !== undefined &&
		sessionStorage.uid !== "null" &&
		sessionStorage.uid !== "undefined"
	) {
		userSignOut();
	} else {
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;

				uid = result.user.uid;
				sessionStorage.uid = uid;
				userk = user;

				loadDataFromWeb();
			})
			.catch((error) => {
				signInMessage.innerHTML = "Nekaj je šlo narobe pri prijavi";
			});
	}
};

const userSignOut = async () => {
	signOut(auth)
		.then((result) => {
			let clr = localStorage.themeColor;
			localStorage.clear();
			localStorage.themeColor = clr;
			//location.reload()
		})
		.catch((error) => {});
};

onAuthStateChanged(auth, (user) => {
	try {
		hideElement(document.getElementById("login-loader"));
	} catch {}

	if (user) {
		setTimeout(() => {
			if (location.pathname.includes("users")) {
				upload();
			}
		}, 200);
		document.querySelector(".gsi-material-button-contents").innerHTML = "Odjava";

		sessionStorage.uid = user.uid;
		if (localStorage.offlineChanges == undefined) {
			window.loadDataFromWeb();
		} else {
			if (navigator.onLine) {
				console.log("update");
				updateUserData();
				localStorage.offlineChanges = undefined;
			}
		}
		if (
			sessionStorage.uid !== null &&
			sessionStorage.uid !== undefined &&
			sessionStorage.uid !== "null" &&
			sessionStorage.uid !== "undefined"
		) {
			watchChanges();
		}
		userk = user;
		signInMessage.innerHTML = "Pozdravljeni, " + user.displayName.split(" ")[0];
	} else {
		document.querySelector(".gsi-material-button-contents").innerHTML = "Google prijava";

		sessionStorage.uid = null;
		signInMessage.innerHTML = "Za dodatne funkcije se prijavite";
	}
});

signInButton.addEventListener("click", userSignIn);

const database = getDatabase(app);

export function updateUserData() {
	if (
		sessionStorage.uid !== null &&
		sessionStorage.uid !== undefined &&
		sessionStorage.uid !== "null" &&
		sessionStorage.uid !== "undefined"
	) {
		const db = getDatabase();

		const updates = {};
		const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
		for (const key in gamesObject) {
			if (gamesObject.hasOwnProperty(key) && key.includes("/users/")) {
				gamesObject[encodeURIComponent(key)] = "";
				updateSharedGame(encodeURIComponent(key), gamesObject[key]);
				delete gamesObject[key];
			}
		}

		updates["/users/" + sessionStorage.uid + "/games/"] = gamesObject;

		return update(ref(db), updates);
	}
}
var userk = auth.currentUser;
window.updateUserData = updateUserData;

function updateSharedGame(key, value) {
	if (value !== "") {
		const db = getDatabase();

		value["!gameName!"] = value["!gameName!"].slice(value["!gameName!"].lastIndexOf("/") + 1);
		const updates = {};
		updates[decodeURIComponent(key)] = value;
		return update(ref(db), updates);
	}
}

export async function updateSharedRemote() {
	var starCountRef = ref(database, listOfPlayers["!gameName!"]);
	onValue(starCountRef, async (snapshot) => {
		let result = snapshot.val();

		let name = listOfPlayers["!gameName!"];
		const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
		gamesObject[listOfPlayers["!gameName!"]] = result;

		gamesObject[listOfPlayers["!gameName!"]]["!gameName!"] = name;
		localStorage.setItem("games", JSON.stringify(gamesObject));
		listOfPlayers = gamesObject[listOfPlayers["!gameName!"]];

		setTimeout(() => {
			if (document.getElementsByClassName("cntScreen").length !== 0) {
				removeElement(
					document.querySelector(".cntScreen"),
					document.querySelector(".crezultLine")
				);
				count(false);
			}
		}, 500);
	});
}

export async function watchChanges() {
	var starCountRef = ref(database, "users/" + sessionStorage.uid);
	onValue(starCountRef, async (snapshot) => {
		let result = snapshot.val()["games"];

		var gamesObject = JSON.parse(localStorage.getItem("games")) || {};
		gamesObject = result;
		for (const key in gamesObject) {
			if (gamesObject.hasOwnProperty(key) && key.includes("%2Fusers%2F")) {
				gamesObject[decodeURIComponent(key)] = "";

				delete gamesObject[key];
			}
		}

		localStorage.setItem("games", JSON.stringify(gamesObject));

		setTimeout(() => {
			if (document.getElementsByClassName("cntScreen").length !== 0) {
				listOfPlayers = gamesObject[listOfPlayers["!gameName!"]];
				removeElement(
					document.querySelector(".cntScreen"),
					document.querySelector(".crezultLine")
				);
				count(false);
			}
		}, 500);
	});
}
window.watchChanges = watchChanges;

export function loadDataFromWeb() {
	const dbRef = ref(getDatabase());
	get(child(dbRef, `users/${sessionStorage.uid}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				let data = snapshot.val()["games"];

				for (const [key, value] of Object.entries(data)) {
					const gamesObject = JSON.parse(localStorage.getItem("games")) || {};
					gamesObject[decodeURIComponent(key)] = value;
					localStorage.setItem("games", JSON.stringify(gamesObject));
				}
				updateUserData();
				return true;
			} else {
				return false;
			}
		})
		.catch((error) => {
			console.error(error);
		});
}
export async function loadDataPath(path) {
	const dbRef = ref(getDatabase());
	var result;

	await get(child(dbRef, path))
		.then((snapshot) => {
			if (snapshot.exists()) {
				result = snapshot.val();
			} else {
				return "";
			}
		})
		.catch((error) => {
			console.error(error);
		});
	return result;
}
window.loadDataFromWeb = loadDataFromWeb;
window.loadDataPath = loadDataPath;
window.updateSharedRemote = updateSharedRemote;
