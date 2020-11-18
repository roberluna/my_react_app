import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB8O6sqxOT6pamUKoJJMFW8GyZyDg8nVBM",
    authDomain: "todo-react-app-e0eb3.firebaseapp.com",
    databaseURL: "https://todo-react-app-e0eb3.firebaseio.com",
    projectId: "todo-react-app-e0eb3",
    storageBucket: "todo-react-app-e0eb3.appspot.com",
    messagingSenderId: "338102468643",
    appId: "1:338102468643:web:c2a3c25f2d14128df2f196"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();