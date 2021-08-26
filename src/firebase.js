import firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCY-40gBE8D2uULInLhPoCzwV6FyVTg6cA',
  authDomain: 'carrito-a9913.firebaseapp.com',
  projectId: 'carrito-a9913',
  storageBucket: 'carrito-a9913.appspot.com',
  messagingSenderId: '958959006962',
  appId: '1:958959006962:web:7b71e9a36098a9703dcc6b',
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

export { firebase, auth, db }
