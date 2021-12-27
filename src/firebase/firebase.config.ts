import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQDwDdH-dve0xW24HY8bvUCs2hY7ZYLzc",
    authDomain: "simple-note-40c89.firebaseapp.com",
    projectId: "simple-note-40c89",
    storageBucket: "simple-note-40c89.appspot.com",
    messagingSenderId: "1086968008572",
    appId: "1:1086968008572:web:a5a115a5aa23b26b095ef9",
    measurementId: "G-ZHNHPTQR9G"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);