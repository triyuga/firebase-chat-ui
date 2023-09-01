import { useContext } from 'react'
import { AppContext } from 'contexts/AppContext'

export function SignOut() {
    const { auth } = useContext(AppContext)
    return (
        <button className='sign-out' onClick={() => auth.signOut()}>
            Sign Out
        </button>
    )
}
