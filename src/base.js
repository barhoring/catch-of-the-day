import Rebase from "re-base";
import firebase from "firebase";
// import config from './secret.js'

// in the free tier I know it's not sufe, sigh :(
const config = {
  apiKey: "AIzaSyCQXMM0QLESQWtLQEN7yKZGPKcfQkMaOY4",
  authDomain: "catch-of-the-day-bar-horing.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-bar-horing.firebaseio.com"
};

const firebaseApp = firebase.initializeApp(config);
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
