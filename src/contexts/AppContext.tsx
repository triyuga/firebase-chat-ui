import { createContext } from 'react'
import { Firestore, getFirestore } from 'firebase/firestore'
import { Auth, getAuth } from 'firebase/auth'
import { FirebaseApp, initializeApp } from 'firebase/app'

export interface IAppContext {
    app: FirebaseApp
    db: Firestore
    auth: Auth
}

const firebaseConfig = {
    apiKey: 'AIzaSyByRCVyybtFyta_78BVfJqZ3T5aBcTYOcw',
    authDomain: 'demoproject-11aa5.firebaseapp.com',
    projectId: 'demoproject-11aa5',
    storageBucket: 'demoproject-11aa5.appspot.com',
    messagingSenderId: '249836069224',
    appId: '1:249836069224:web:e41040ac31898c9796f6dd'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export const AppContext = createContext<IAppContext>({} as IAppContext)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const context = useAppContextProvider()
    return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

const useAppContextProvider = (): IAppContext => {
    return {
        app,
        db,
        auth
    }
}
