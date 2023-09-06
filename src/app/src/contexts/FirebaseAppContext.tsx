import { createContext } from 'react'
import { Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'
import { Auth, User, connectAuthEmulator, getAuth } from 'firebase/auth'
import { FirebaseApp, initializeApp } from 'firebase/app'
// import { firebaseConfig } from 'domain/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseLocalConfig, firebaseConfig } from 'domain/config'

const isLocalhost = window.location.hostname === 'localhost'

const app = isLocalhost ? initializeApp(firebaseLocalConfig) : initializeApp(firebaseConfig)
// const app = initializeApp(firebaseLocalConfig)
// const app = initializeApp()
const auth = getAuth(app)
const db = getFirestore(app)

if (isLocalhost) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, '127.0.0.1', 8080)
}

interface IFirebaseAppContext {
    app: FirebaseApp
    db: Firestore
    auth: Auth
    user: User | null
    loading: boolean
}

export const FirebaseAppContext = createContext<IFirebaseAppContext>({} as IFirebaseAppContext)

export const FirebaseAppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const context = useFirebaseAppContextProvider()
    return <FirebaseAppContext.Provider value={context}>{children}</FirebaseAppContext.Provider>
}

const useFirebaseAppContextProvider = (): IFirebaseAppContext => {
    const [user, loading] = useAuthState(auth)
    return {
        app,
        db,
        auth,
        loading,
        user: user || null
    }
}
