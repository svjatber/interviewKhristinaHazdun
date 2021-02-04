import firebase  from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDWZLvUbH--5uCrSb2__4x5yMZi6ZvEsbs",
    authDomain: "interview-222ac.firebaseapp.com",
    projectId: "interview-222ac",
    storageBucket: "interview-222ac.appspot.com",
    messagingSenderId: "638155893248",
    appId: "1:638155893248:web:46a51955f0b6420687c6e5"
};
// Initialize Firebase
let fireB = firebase.initializeApp(firebaseConfig);


export default fireB
