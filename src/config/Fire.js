import firebase from 'firebase';
// require("firebase/database");
// require("firebase/auth");

const config = {
    apiKey: "AIzaSyB0FdjRYOK7DBpciv8QrppzypdwqkBpu2s",
    authDomain: "pro-organiser-app.firebaseapp.com",
    databaseURL: "https://pro-organiser-app.firebaseio.com",
    projectId: "pro-organiser-app",
    storageBucket: "pro-organiser-app.appspot.com",
    messagingSenderId: "691793629707",
    appId: "1:691793629707:web:e163cfd14a6ee09c6d6d0e"
};

const fire = firebase.initializeApp(config);

// export const auth = firebase.auth;
// export const db = firebase.database();

export default fire;