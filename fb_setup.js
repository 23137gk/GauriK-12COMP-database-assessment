// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnbS2cuUpZUCc95ZaLbgnA2bRzOq7mN-g",
  authDomain: "comp-database-assessment.firebaseapp.com",
  databaseURL: "https://comp-database-assessment-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "comp-database-assessment",
  storageBucket: "comp-database-assessment.firebasestorage.app",
  messagingSenderId: "1060896993817",
  appId: "1:1060896993817:web:e60f3e7dc857041e8ab088",
  measurementId: "G-KLBKEKJED3"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);
