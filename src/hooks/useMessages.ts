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
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { AppContext } from 'contexts/AppContext'
import { Message, NewMessage } from 'domain/models'
import { useContext } from 'react'

export function useMessages(): {
    messages: Message[]
    sendMessage: (text: string) => Promise<void>
    loading: boolean
    error?: FirestoreError
} {
    const { db, auth } = useContext(AppContext)
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
