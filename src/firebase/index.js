// import * as firebase from 'firebase'
//import firebase from 'firebase'
import firebase from '@firebase/app'
require('firebase/auth')
require('firebase/database')

const config = {
    apiKey: "AIzaSyDaR6fmPpyGtTXrkPkFpQ-24rw6b9Wc9hw",
    authDomain: "momovie-df108.firebaseapp.com",
    databaseURL: "https://momovie-df108.firebaseio.com",
    projectId: "momovie-df108",
    storageBucket: "momovie-df108.appspot.com",
    messagingSenderId: "460684187144",
    appId: "1:460684187144:web:5b89d660c30661006723bd",
    measurementId: "G-7QFNQR4FJE"
}

const app = firebase.initializeApp(config, 'client')
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export {app, facebookProvider, githubProvider, twitterProvider, googleProvider}