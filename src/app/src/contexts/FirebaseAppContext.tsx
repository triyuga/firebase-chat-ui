import { createContext } from 'react'
import { Firestore } from 'firebase/firestore'
import { Auth, User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Analytics } from 'firebase/analytics'
import { analytics, auth, db } from 'domain/firebase'

interface IFirebaseAppContext {
    db: Firestore
    auth: Auth
    analytics: Analytics
    user: User | null
    userIsLoading: boolean
}

export const FirebaseAppContext = createContext<IFirebaseAppContext>({} as IFirebaseAppContext)

export const FirebaseAppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const context = useFirebaseAppContextProvider()
    return <FirebaseAppContext.Provider value={context}>{children}</FirebaseAppContext.Provider>
}

const useFirebaseAppContextProvider = (): IFirebaseAppContext => {
    const [user, loading] = useAuthState(auth)
    return {
        db,
        auth,
        analytics,
        userIsLoading: loading,
        user: user || null
    }
}
