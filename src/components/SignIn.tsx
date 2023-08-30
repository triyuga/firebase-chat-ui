import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useContext } from 'react'
import { AppContext } from 'contexts/AppContext'

export function SignIn() {
    const { auth } = useContext(AppContext)
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    return (
        <button className='sign-in' onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}
