import { useContext } from 'react'
import { FirebaseAppContext } from 'contexts/FirebaseAppContext'

export function SignOut() {
    const { auth } = useContext(FirebaseAppContext)
    return (
        <button className='sign-out' onClick={() => auth.signOut()}>
            Sign Out
        </button>
    )
}
