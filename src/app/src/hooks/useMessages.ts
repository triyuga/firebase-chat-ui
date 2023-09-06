import {
    collection,
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
import { FirebaseAppContext } from 'contexts/FirebaseAppContext'
import { Message } from 'domain/models'
import { useContext } from 'react'
import { MessageService } from 'domain/services/MessageService'

export function useMessages(): {
    messages: Message[]
    sendMessage: (text: string) => Promise<void>
    loading: boolean
    error?: FirestoreError
} {
    const { db, user } = useContext(FirebaseAppContext)
    const messagesCollection = collection(db, 'messages').withConverter(messageConverter)

    const [messages, loading, error] = useCollectionData(
        query(messagesCollection, orderBy('createdAt')),
        {
            snapshotListenOptions: { includeMetadataChanges: true }
        }
    )

    const service = new MessageService(db, user!)

    return {
        messages: messages || [],
        sendMessage: service.sendMessage,
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
