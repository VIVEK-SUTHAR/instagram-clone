import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAUuSaZeL7AwKJgrZhPUs9wevsV_IbvxJo",
    authDomain: "instagram-clone-14882.firebaseapp.com",
    projectId: "instagram-clone-14882",
    storageBucket: "instagram-clone-14882.appspot.com",
    messagingSenderId: "217460924510",
    appId: "1:217460924510:web:a4711b5501f63ab42cd4cf"
})
const db = firebaseApp.firestore();

const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };

