import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'contexts/AppContext'
import { SignIn } from 'components/SignIn'
import { SignOut } from 'components/SignOut'
import { ChatRoom } from 'pages/ChatRoom/ChatRoom'
import './App.scss'

const router = createBrowserRouter([
    {
        path: '/',
        element: <ChatRoom />
    }
])

export function App() {
    const { user, loading } = useContext(AppContext)

    return (
        <div className='App'>
            <header>
                <h1>React Firebase Chat</h1>
                {user && <SignOut />}
            </header>
            <section>
                {loading ? <></> : user ? <RouterProvider router={router} /> : <SignIn />}
            </section>
        </div>
    )
}
