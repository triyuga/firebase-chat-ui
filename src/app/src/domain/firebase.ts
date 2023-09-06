import { Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyDMlDBnu-Wbl-i2Bhqa5e7xsrNQhqDWzSk',
    authDomain: 'fir-rpg-chat.firebaseapp.com',
    projectId: 'fir-rpg-chat',
    storageBucket: 'fir-rpg-chat.appspot.com',
    messagingSenderId: '451174011351',
    appId: '1:451174011351:web:c5e281180865fdf2577b92',
    measurementId: 'G-71C27HQ04E'
}

// const LOCAL_DUMMY_VALUE = 'localhost' // can be anything
// const firebaseLocalConfig = {
//     apiKey: LOCAL_DUMMY_VALUE,
//     projectId: LOCAL_DUMMY_VALUE,
//     authDomain: LOCAL_DUMMY_VALUE
// }

const isLocalhost = window.location.hostname === 'localhost'

// const app = isLocalhost ? initializeApp(firebaseLocalConfig) : initializeApp(firebaseConfig)

const app = initializeApp(firebaseConfig)

export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const analytics: Analytics = getAnalytics(app)

if (isLocalhost) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, '127.0.0.1', 8080)
}
