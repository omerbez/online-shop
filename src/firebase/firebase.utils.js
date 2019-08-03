import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdZMznLGYva9QMJGoDNN06L12h2agtEgQ",
    authDomain: "online-shop-6bfbf.firebaseapp.com",
    databaseURL: "https://online-shop-6bfbf.firebaseio.com",
    projectId: "online-shop-6bfbf",
    storageBucket: "",
    messagingSenderId: "412984704489",
    appId: "1:412984704489:web:0c545418fec4a24c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//config Google sign-in provider option (could be facebook for example..)
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

//this is the method that show the Google sign-in popup.
export const SignInWithGoogle = () => auth.signInWithPopup(provider); 

export default firebase;