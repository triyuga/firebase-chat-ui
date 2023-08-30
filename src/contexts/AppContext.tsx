import { createContext } from 'react'
import { Firestore, getFirestore } from 'firebase/firestore'
import { Auth, User, getAuth } from 'firebase/auth'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { firebaseConfig } from 'domain/config'
import { useAuthState } from 'react-firebase-hooks/auth'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export interface IAppContext {
    app: FirebaseApp
    db: Firestore
    auth: Auth
    user: User | null
    loading: boolean
}

export const AppContext = createContext<IAppContext>({} as IAppContext)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const context = useAppContextProvider()
    return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

const useAppContextProvider = (): IAppContext => {
    const [user, loading] = useAuthState(auth)
    return {
        app,
        db,
        auth,
        loading,
        user: user || null
    }
}
