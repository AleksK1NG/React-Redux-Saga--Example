import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'React-Redux-Saga-Firebase'

const config = {
  /*
  * Firebase web app config here
  *
  * apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  * */
}

firebase.initializeApp(config)
