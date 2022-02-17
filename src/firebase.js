import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD7yOgRPDr_ZM14qa0L9yTeAt5u-nDTibI',
  authDomain: 'degfb-e0284.firebaseapp.com',
  projectId: 'degfb-e0284',
  storageBucket: 'degfb-e0284.appspot.com',
  messagingSenderId: '234763085848',
  appId: '1:234763085848:web:326ce6868fa1db5fddfb6d'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// utils
const db = getFirestore()
const auth = getAuth()

export { app, auth, db }
