import { useEffect, useMemo, useRef, useState } from 'react'
import { useMessages } from 'hooks/useMessages'
import { ChatMessage } from './components/ChatMessage'

export function ChatRoom() {
    const scrollRef = useRef<HTMLSpanElement>(null)
    const [formValue, setFormValue] = useState('')

    const { messages, sendMessage } = useMessages()

    const messageCount = useMemo(() => messages.length, [messages])

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [messageCount])

    const submitChatForm = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        await sendMessage(formValue)
        setFormValue('')
    }

    return (
        <>
            <main>
                {messages?.map(message => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                <span ref={scrollRef}></span>
            </main>

            <form onSubmit={submitChatForm}>
                <input
                    value={formValue}
                    onChange={e => setFormValue(e.target.value)}
                    autoFocus
                    placeholder='say something'
                />
                <button type='submit' disabled={!formValue}>
                    Send
                </button>
            </form>
        </>
    )
}
