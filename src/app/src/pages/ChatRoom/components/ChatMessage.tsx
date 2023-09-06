import { Message } from 'domain/models'
import { useContext } from 'react'
import { FirebaseAppContext } from 'contexts/FirebaseAppContext'

interface ChatMessageProps {
    message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
    const { auth } = useContext(FirebaseAppContext)
    const { text, uid, photoURL } = message
    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received'

    return (
        <>
            <div className={`message ${messageClass}`}>
                <img
                    alt='profile pic'
                    src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}
                />
                <p>{text}</p>
            </div>
        </>
    )
}
