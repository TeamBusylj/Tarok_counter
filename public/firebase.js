// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
import { getDatabase, ref, set, child, get, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrxvJ-fs7wtfnsLzOy6WI_1J_CMHPXpoU",
    authDomain: "tarock-counter.firebaseapp.com",
    projectId: "tarock-counter",
    storageBucket: "tarock-counter.appspot.com",
    messagingSenderId: "1058014595030",
    appId: "1:1058014595030:web:3f9c1a0095ef78276d4677",
    measurementId: "G-K7NFBYQN0F",
    databaseURL: "https://tarock-counter-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const provider = new GoogleAuthProvider()
const signInButton = document.getElementById("signInGoogle")
const signOutButton = document.getElementById("signOutGoogle")
const signInMessage = document.getElementById("signInMessage")
var uid = null
signOutButton.style.display = "none"



const userSignIn = async () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user
            console.log(result);
            console.log(result.user.uid);
            uid = result.user.uid
            localStorage.uid = uid
            userk = user
            console.log(uid);
            loadDataFromWeb()
        }).catch((error) => {
            console.log(error.code, error.message)
            signInMessage.innerHTML = "Nekaj je šlo narobe pri prijavi.";
        })
}

const userSignOut = async () => {
    signOut(auth)
        .then((result) => {
            console.log("signed out");
            localStorage.clear()
            location.reload()
        }).catch((error) => {

        })
}



onAuthStateChanged(auth, (user) => {
    hideElement(document.querySelector(".loader"))
    if (user) {
        signOutButton.style.display = "flex";
        signInButton.style.display = "none"
        localStorage.uid = user.uid
        userk = user
        signInMessage.innerHTML = "Pozdravljeni, " + user.displayName + ".";
    } else {
        signInButton.style.display = "flex"
        signOutButton.style.display = "none";
        localStorage.uid = null
        signInMessage.innerHTML = "Za shranjevanje podatkov se prijavite.";
    }
})



signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);

function userSignInPopup() {
    let anima = document.createElement("div")
    anima.classList.add("signInAnim")

    const rect = signInButton.getBoundingClientRect();
    signInButton.style.transform = "scale(4)"

    document.getElementById("signInText").style.opacity = "0"
    document.getElementById("Capa_1").style.opacity = "0"
    signInButton.appendChild(anima)



    setTimeout(() => {
        document.getElementById("signInText").style.opacity = "1"
        document.getElementById("Capa_1").style.opacity = "1"
        userSignIn()
        setTimeout(() => {
            anima.remove()
        }, 50);
    }, 450);


}
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
console.log(database);
function writeUserData(userId) {
    if (localStorage.uid !== null) {
        const db = getDatabase();

        const updates = {};
        updates['users/' + userId + '/games/'] = {};


        return update(ref(db), updates);
    }
}
export function updateUserData() {
    if (localStorage.uid !== null && localStorage.uid !== undefined && localStorage.uid !== "null" && localStorage.uid !== "undefined") {

        const db = getDatabase();

        const updates = {};
        updates['/users/' + localStorage.uid + "/games/"] = JSON.parse(localStorage.getItem('games'));


        return update(ref(db), updates);
    }
}
var userk = auth.currentUser;
window.updateUserData = updateUserData
export function loadDataFromWeb() {

    console.log(userk);
    if (userk) {
        signOutButton.style.display = "flex";
        signInButton.style.display = "none"

        signInMessage.innerHTML = "Pozdravljeni, " + userk.displayName + ".";
    } else {
        signInButton.style.display = "flex"
        signOutButton.style.display = "none";

        signInMessage.innerHTML = "Za shranjevanje podatkov se prijavite.";
    }
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${localStorage.uid}`)).then((snapshot) => {
        console.log(`users/${localStorage.uid}`);
        if (snapshot.exists()) {
            console.log(snapshot.val()["games"]);
            let data = snapshot.val()["games"]
            console.log(data);
            for (const [key, value] of Object.entries(data)) {
                const gamesObject = JSON.parse(localStorage.getItem('games')) || {};
                gamesObject[key] = value;
                localStorage.setItem("games", JSON.stringify(gamesObject));

            };
            return true
        } else {
            console.log("No data available");

            return false
        }
    }).catch((error) => {
        console.error(error);
    });


}
window.loadDataFromWeb = loadDataFromWeb


