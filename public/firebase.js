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
signInMessage.style.display = "none"


const userSignIn = async () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user
            console.log(result);
            console.log(result.user.uid);
            uid = result.user.uid
            localStorage.uid = uid
            writeUserData(result.user.uid, result.user.displayName, result.user.email, window.listOfPlayers)
            loadDataFromWeb()
        }).catch((error) => {
            console.log(error.code, error.message)
        })
}

const userSignOut = async () => {
    signOut(auth)
        .then((result) => {
            console.log("signed out");
            location.reload()
        }).catch((error) => {

        })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        signOutButton.style.display = "block";
        signInButton.style.display = "none"
        signInMessage.style.display = "block";
        signInMessage.innerHTML = user.displayName;
        signInMessage.innerHTML = user.email
    } else {
        signInButton.style.display = "block"
        signOutButton.style.display = "none";
        signInMessage.style.display = "none";
    }
})

signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
console.log(database);
function writeUserData(userId, name, email, gameData) {

    const db = getDatabase();

    const updates = {};
    updates['users/' + userId + '/email'] = email;
    updates['users/' + userId + '/username'] = name;

    return update(ref(db), updates);

}
export function updateUserData(key, value) {
    const db = getDatabase();

    const updates = {};
    updates['/users/' + localStorage.uid + "/games/" + key] = value;


    return update(ref(db), updates);
}
window.updateUserData = updateUserData
export function loadDataFromWeb() {

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${localStorage.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val()["games"]);
            let data = snapshot.val()["games"]
            console.log(data);
            for (const [key, value] of Object.entries(data)) {
                sessionStorage.setItem(key, value)
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
