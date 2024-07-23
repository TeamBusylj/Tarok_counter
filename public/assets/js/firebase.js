// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics,setConsent } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-performance.js";
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
	FacebookAuthProvider,
	signOut,
	fetchSignInMethodsForEmail,
	onAuthStateChanged,
	signInWithCredential
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyBrxvJ-fs7wtfnsLzOy6WI_1J_CMHPXpoU",
	authDomain: "http://stevec-taroka.si",
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
const perf = getPerformance(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const analytics = getAnalytics(app);
const signInMessage = document.getElementById("signInMessage");
var uid = null;

setConsent({
	analytics_storage: "denied",
	ad_storage: "denied"
  });
  window.addEventListener("load", function () {

	if(!checkConset()){

	let cookieSheet = makeBottomheet('Piškotki', true)
	cookieSheet.innerHTML = "<span style='margin-bottom:20px;'>Spletna stran uporablja piškotke za delovanje.</span>"
	addElement("div",cookieSheet, "break")
	let policyb = addElement("md-text-button", cookieSheet)
	policyb.innerHTML = "Politika"
	policyb.addEventListener("click", privacy)
	
	let conset = addElement("md-filled-tonal-button", cookieSheet)
	conset.innerHTML = "Se strinjam"

	conset.addEventListener("click", function () {
	
		setConsent({
			analytics_storage: "true",
			ad_storage: "true"
		  });
		  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const expires = date.toUTCString();
  document.cookie = `consentCookies=true; expires=${expires}; path=/`;
  document.querySelector(".bottomSheetScrim").click();
	})
			
}
  })
async function deleteAllDataF() {
	if (sessionStorage.uid !== null && navigator.onLine) {
		userSignOut();
		setTimeout(() => {
			localStorage.clear();
			sessionStorage.clear();
		}, 500);

		const db = getDatabase();

		const updates = {};
		updates["users/" + sessionStorage.uid] = {};
		auth.currentUser.delete()
		return await update(ref(db), updates);
	}
}
window.deleteAllDataF = deleteAllDataF;

window.onGoogleLibraryLoad = () => {
	console.log("Google library loaded");

		
	}	

	const facebookSignIn = (url) => {
		if (
			sessionStorage.uid !== null &&
			sessionStorage.uid !== undefined &&
			sessionStorage.uid !== "null" &&
			sessionStorage.uid !== "undefined"
		) {
			userSignOut();
		} else {
		signInWithPopup(auth, fbProvider)
  .then((result) => {
	const user = result.user;
	
	uid = result.user.uid;
	sessionStorage.uid = uid;
	userk = user;

	loadDataFromWeb();
	document.querySelector(".bottomSheetScrim").click();
  })
  .catch((error) => {
	
	signInMessage.innerHTML = "Nekaj je šlo narobe pri prijavi";
	document.querySelector(".bottomSheetScrim").click();
	if(error.message.includes('account-exists-with-different-credential')){
		signInMessage.innerHTML = "Napaka - poskusite se prijaviti z Googlom";

	}
  });


	}}
const userSignIn = async () => {
	const userAgent = navigator.userAgent.toLowerCase()
	if (['fb_iab', 'fban', 'fbav', 'instagram'].some(app => userAgent.includes(app))){
		facebookIntent('stevec-taroka.si')
	}else{



		
	if (
		sessionStorage.uid !== null &&
		sessionStorage.uid !== undefined &&
		sessionStorage.uid !== "null" &&
		sessionStorage.uid !== "undefined"
	) {
		userSignOut();
	} else {
		try {
			
		
		
				
				google.accounts.id.initialize({
					client_id: '1058014595030-paljk3kd0chkiakv9mkokt2eic0viqsm.apps.googleusercontent.com', // Replace with your actual client ID
					callback: handleCredentialResponse,
					use_fedcm_for_prompt: true
				  });
				
			  
				  google.accounts.id.prompt((notification) => {
					if(notification["g"]==="skipped"){
						console.log("Pop Up Closed!") 
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
				})
					}
				})
			
			  function handleCredentialResponse(response) {
				if (response.credential) {
				
					const credential = GoogleAuthProvider.credential(response.credential)
					signInWithCredential(auth, credential).then(function (result) {
						const user = result.user;
		
						uid = result.user.uid;
						sessionStorage.uid = uid;
						userk = user;
		
						loadDataFromWeb();
				
					  document.querySelector(".bottomSheetScrim").click();
					})
				} 
			  }
			
			
			} catch (e) {
				signInWithPopup(auth, provider)
				.then((result) => {
					const user = result.user;
	
					uid = result.user.uid;
					sessionStorage.uid = uid;
					userk = user;
	
					loadDataFromWeb();
					document.querySelector(".bottomSheetScrim").click();
				})
				.catch((error) => {
					signInMessage.innerHTML = "Nekaj je šlo narobe pri prijavi";
					document.querySelector(".bottomSheetScrim").click();
				});}
			
		
		
		
	}	}
};

const userSignOut = async () => {
	signOut(auth)
		.then((result) => {
			userk = false
			document.getElementById("dlgSlct").innerHTML = ""
			let clr = localStorage.themeColor;
			localStorage.clear();
			localStorage.themeColor = clr;
			//location.reload()
		})
		.catch((error) => {});
};
if(location.href.includes('web.app')){
	location.href = "https://stevec-taroka.si"
}
onAuthStateChanged(auth, (user) => {


	if (user) {
		setTimeout(() => {
			if (location.pathname.includes("users")) {
			  upload();
			}
		  }, 10);
		
		document.querySelector(".signInBtn").innerHTML = 'Odjava<md-icon slot="icon">logout</md-icon>';
		document.querySelector(".newGameBtn").style.display = 'flex';

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
		  document.querySelector(".signInBtn").innerHTML = 'Prijava<md-icon slot="icon">login</md-icon>';
		  document.querySelector(".newGameBtn").style.display = "none";

		sessionStorage.uid = null;
		signInMessage.innerHTML = "Niste prijavljeni";
	}
});
var userk = auth.currentUser;
function loginSheet() {
	if(userk){
userSignOut()
	}else{
		let newElement = makeBottomheet('Prijava')
		let googleBtn = addElement('button', newElement, 'googleBtnIn');
		googleBtn.innerHTML = '<span>Google prijava</span><svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"</svg>'
	  googleBtn.addEventListener('click', userSignIn)
	  addElement("div", newElement, "break");
		let fbBtn = addElement('button',   newElement, 'googleBtnIn')
		fbBtn.innerHTML = '<span>Facebook prijava</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="facebook"><path fill="#1976D2" fill-rule="evenodd" d="M12 5.5H9v-2a1 1 0 0 1 1-1h1V0H9a3 3 0 0 0-3 3v2.5H4V8h2v8h3V8h2l1-2.5z" clip-rule="evenodd"></path></svg>'
		fbBtn.addEventListener('click', facebookSignIn)
	}

  
  }

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


window.loadDataFromWeb = loadDataFromWeb;
window.loadDataPath = loadDataPath;
window.updateSharedRemote = updateSharedRemote;
window.loginSheet = loginSheet





