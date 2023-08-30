import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppContext } from 'contexts/AppContext'
import { useMessages } from 'hooks/useMessages'
import { ChatMessage } from './ChatMessage'

export function ChatRoom() {
    const context = useContext(AppContext)
    const scrollRef = useRef<HTMLSpanElement>(null)
    const [formValue, setFormValue] = useState('')
    const { messages, sendMessage } = useMessages(context)
    const messageCount = useMemo(() => messages.length, [messages])

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [messageCount])

    const submitChatForm = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await sendMessage(formValue)
        setFormValue('')
    }

    return (
        <>
            <main>
                {messages &&
                    messages.map(message => <ChatMessage key={message.id} message={message} />)}
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
