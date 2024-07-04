// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
	getDatabase,
	ref,
	child,
	get,
	update,
	onValue
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

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

	$('.dot').show();
	$('#signInTxt').hide();
	$('#gIcon').hide();
		
	if (
		sessionStorage.uid !== null &&
		sessionStorage.uid !== undefined &&
		sessionStorage.uid !== "null" &&
		sessionStorage.uid !== "undefined"
	) {
		userSignOut();
	} else {
		
			
			try {
				AndroidInt.signInInterface()
				console.log("android")
			} catch (error) {
				
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
			
		
			
		
		
		
	}
};

const userSignOut = async () => {
	signOut(auth)
		.then((result) => {
			document.getElementById("dlgSlct").innerHTML = ""
			let clr = localStorage.themeColor;
			localStorage.clear();
			localStorage.themeColor = clr;
			//location.reload()
		})
		.catch((error) => {});
};

onAuthStateChanged(auth, (user) => {
	try {
		$('.dot').hide();
		$('#signInTxt').show();
		$('#gIcon').show();
	} catch {}

	if (user) {

		setTimeout(() => {
			if (location.pathname.includes("users")) {
			  upload();
			}
		  }, 10);
		
		document.getElementById("signInTxt").innerHTML = "Odjava";

		sessionStorage.uid = user.uid;
		if (localStorage.offlineChanges == undefined) {
			
		loadDataFromWeb();
		} else {
			if (navigator.onLine) {
				console.log("update");
				updateUserData();
				localStorage.offlineChanges = undefined;
			}
		}
		if (!navigator.onLine) {
			Game()
		}
			watchChanges();
		
		userk = user;
		signInMessage.innerHTML = "Pozdravljeni, " + user.displayName.split(" ")[0];
	} else {
		setTimeout(() => {
			if (location.pathname.includes("users")) {
			  upload();
			}
		  }, 10);
		document.getElementById("signInTxt").innerHTML = "Prijava";

		sessionStorage.uid = null;
		signInMessage.innerHTML = "Niste prijavljeni";
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
		function sortObjectKeys(obj) {
			// Get the keys of the object and sort them alphabetically
			const sortedKeys = Object.keys(obj).sort();
		
			// Create a new object with sorted keys
			const sortedObject = {};
			sortedKeys.forEach(key => {
				sortedObject[key] = obj[key];
			});
		
			return sortedObject;
		}
		const gamesObject = JSON.parse(localStorage.getItem("games")) || {};

		if(decodeURIComponent(JSON.stringify(sortObjectKeys(result))).replace(/\/users\/.*\/games\//, "") !== decodeURIComponent(JSON.stringify(sortObjectKeys(listOfPlayers))).replace(/\/users\/.*\/games\//, "")){

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
	}
	});
}

export async function watchChanges() {
	var starCountRef = ref(database, "users/" + sessionStorage.uid);
	onValue(starCountRef, async (snapshot) => {
		var result = snapshot.val()["games"];

		var gamesObject = JSON.parse(localStorage.getItem("games")) || {};
		function sortObjectKeys(obj) {
			// Get the keys of the object and sort them alphabetically
			const sortedKeys = Object.keys(obj).sort();
		
			// Create a new object with sorted keys
			const sortedObject = {};
			sortedKeys.forEach(key => {
				sortedObject[key] = obj[key];
			});
		
			return sortedObject;
		}
		
		if(decodeURIComponent(JSON.stringify(sortObjectKeys(result))) !== decodeURIComponent(JSON.stringify(sortObjectKeys(gamesObject)))){
			console.log("change");
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
				count(true);
			}
		}, 500);
			
	}
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
				
				Game()
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

async function signInWithIdAndroid(name) {

	
	
	try {
		$('.dot').hide();
		$('#signInTxt').show();
		$('#gIcon').show();
	} catch {}
	document.getElementById("signInTxt").innerHTML = "Odjava";
console.log(uid)
		sessionStorage.uid = uid;
		userk = name;
		signInMessage.innerHTML = "Pozdravljeni, " + name.split(" ")[0]
}
export async function registerCredential() {

	// TODO: Add an ability to create a passkey: Obtain the challenge and other options from the server endpoint.
  
	// TODO: Add an ability to create a passkey: Create a credential.
  
	// TODO: Add an ability to create a passkey: Register the credential to the server endpoint.
  
  };

window.signInWithIdAndroid = signInWithIdAndroid;
window.loadDataFromWeb = loadDataFromWeb;
window.loadDataPath = loadDataPath;
window.updateSharedRemote = updateSharedRemote;





