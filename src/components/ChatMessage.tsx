import { Message } from 'model/model'
import { useContext } from 'react'
import { AppContext } from 'contexts/AppContext'

interface ChatMessageProps {
    message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
    const { auth } = useContext(AppContext)
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
