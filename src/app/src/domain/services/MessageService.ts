import { NewMessage } from 'domain/models'
import { User } from 'firebase/auth'
import { Firestore, addDoc, collection, serverTimestamp } from 'firebase/firestore'

export class MessageService {
    private db: Firestore
    private user: User

    constructor(db: Firestore, user: User) {
        this.db = db
        this.user = user
    }

    sendMessage = async (text: string) => {
        try {
            const message: NewMessage = {
                text,
                createdAt: serverTimestamp(),
                uid: this.user.uid,
                photoURL: this.user.photoURL || undefined
            }
            const docRef = await addDoc(collection(this.db, 'messages'), message)
            console.log('Document written with ID: ', docRef.id)
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    sendMessageViaApi = async (text: string) => {
        try {
            const message: NewMessage = {
                text,
                createdAt: serverTimestamp(),
                uid: this.user.uid,
                photoURL: this.user.photoURL || undefined
            }
            const docRef = await addDoc(collection(this.db, 'messages'), message)
            console.log('Document written with ID: ', docRef.id)
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }
}
