import { FieldValue } from 'firebase/firestore'

export interface Message {
    id: string
    createdAt: FieldValue
    text: string
    uid: string
    photoURL?: string
}

export type NewMessage = Omit<Message, 'id'>
