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

export const createUserIfNotExists = async(userAuth, otherData) => {
    //if it's a sign-out..
    if(!userAuth) 
        return;

    //get DocumentReference object - for CRUD operations!
    //the document ID is the user.uid.. that what we are looking for..
    const userDocRef = firestore.doc(`users/${userAuth.uid}`);
    //get the doc snapshot, the get() method is a Promise so we have to await for result..
    //The snapshot object is for data!
    const snapshot = await userDocRef.get();
    
    //check if the document isn't exists, actually the document is unique 
    //and if it exists nothing will happen, but still it's better to check for perfomance
    if(!snapshot.exists) {
        //coping the displayName & email properties from the userAuth object
        const {displayName, email} = userAuth;
        const createDate = new Date();
        try {
            //performing create operation to store the user data
            await userDocRef.set({
                displayName,
                email,
                createDate,
                ...otherData
            });
        } catch(ex) {
            console.log("error creating user: "+ex.message);
        }     
    }
    return userDocRef;
}