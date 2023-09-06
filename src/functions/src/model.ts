export interface Message {
    id: string
    createdAt: Date
    text: string
    uid: string
    photoURL?: string
}

export type NewMessage = Omit<Message, 'id'>
