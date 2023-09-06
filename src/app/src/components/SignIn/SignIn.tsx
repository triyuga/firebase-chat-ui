import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useContext } from 'react'
import { FirebaseAppContext } from 'contexts/FirebaseAppContext'
import styles from './SignIn.module.scss'

export function SignIn() {
    const { auth } = useContext(FirebaseAppContext)

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    return (
        <button className={styles.root} onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}
