// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore} from "@firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5Fm-nXKR5juhEvjbMRnk3l1CUwZiBu3Q",
    authDomain: "shp-progress.firebaseapp.com",
    projectId: "shp-progress",
    storageBucket: "shp-progress.firebasestorage.app",
    messagingSenderId: "846527372523",
    appId: "1:846527372523:web:ce3d506a13f77808f732ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// db
export const firestore = getFirestore(app);