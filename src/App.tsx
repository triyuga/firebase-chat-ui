import { useAuthState } from 'react-firebase-hooks/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, Auth } from 'firebase/auth'
import { ChatRoom } from './components/ChatRoom'
import './App.css'

const firebaseConfig = {
    apiKey: 'AIzaSyByRCVyybtFyta_78BVfJqZ3T5aBcTYOcw',
    authDomain: 'demoproject-11aa5.firebaseapp.com',
    projectId: 'demoproject-11aa5',
    storageBucket: 'demoproject-11aa5.appspot.com',
    messagingSenderId: '249836069224',
    appId: '1:249836069224:web:e41040ac31898c9796f6dd'
}

export interface AppContext {
    db: Firestore
    auth: Auth
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export function App() {
    const [user] = useAuthState(auth)

    return (
        <div className='App'>
            <header>
                <h1>React Firebase Chat</h1>
                <SignOut />
            </header>
            <section>{user ? <ChatRoom context={{ auth, db }} /> : <SignIn />}</section>
        </div>
    )
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    return (
        <>
            <button className='sign-in' onClick={signInWithGoogle}>
                Sign in with Google
            </button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )
}

function SignOut() {
    return (
        auth.currentUser && (
            <button className='sign-out' onClick={() => auth.signOut()}>
                Sign Out
            </button>
        )
    )
}
