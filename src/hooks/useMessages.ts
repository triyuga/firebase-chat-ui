import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    FirestoreDataConverter,
    DocumentData,
    WithFieldValue,
    QueryDocumentSnapshot,
    SnapshotOptions,
    FirestoreError
} from 'firebase/firestore'
import { Message, NewMessage } from '../model/model'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { IAppContext } from 'contexts/AppContext'

export function useMessages({ db, auth }: IAppContext): {
    messages: Message[]
    sendMessage: (text: string) => Promise<void>
    loading: boolean
    error?: FirestoreError | undefined
} {
    const messagesCollection = collection(db, 'messages').withConverter(messageConverter)

    const [messages, loading, error] = useCollectionData(
        query(messagesCollection, orderBy('createdAt')),
        {
            snapshotListenOptions: { includeMetadataChanges: true }
        }
    )

    const sendMessage = async (text: string) => {
        try {
            const message: NewMessage = {
                text,
                createdAt: serverTimestamp(),
                uid: auth.currentUser!.uid,
                photoURL: auth.currentUser!.photoURL || undefined
            }
            const docRef = await addDoc(collection(db, 'messages'), message)
            console.log('Document written with ID: ', docRef.id)
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    return {
        messages: messages || [],
        sendMessage,
        loading,
        error
    }
}

const messageConverter: FirestoreDataConverter<Message> = {
    toFirestore(message: WithFieldValue<Message>): DocumentData {
        return { ...message }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Message {
        const data = snapshot.data(options)
        return {
            id: snapshot.id,
            createdAt: data.createdAt,
            text: data.text,
            uid: data.uid,
            photoURL: data.photoURL
        }
    }
}
