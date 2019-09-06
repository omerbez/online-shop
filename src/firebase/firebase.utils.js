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
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"});

//this is the method that show the Google sign-in popup.
export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider); 

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


//This code actually should be in the backend..
//Only the backend will have a permission to write to the database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    //to write all the data in atomic call
    const batch = firestore.batch();
    objectsToAdd.forEach((doc) => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, doc);
    });

    return await batch.commit();
}


export const parseShopCollectionSnapshot = (collection) => {
    const transformedDocsData = collection.docs.map((doc) => {
        //split out the title and items from the document
        const { title, items } = doc.data(); 
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title: title,
            items: items
        }
    });
    
    //transform the array into object, the keys are the titles, the values are the
    //array indexes
    const toObject = {};
    for(let i=0; i<transformedDocsData.length; i++) 
        toObject[transformedDocsData[i].title.toLowerCase()] = transformedDocsData[i];
    
    return toObject;
}


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe(); //imiddiatly cancel the listener.. we want listen just once
            resolve(user);
        }, reject)
    });
}