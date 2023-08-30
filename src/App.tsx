import { useAuthState } from 'react-firebase-hooks/auth'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'contexts/AppContext'
import './App.scss'
import { SignIn } from 'components/SignIn'
import { SignOut } from 'components/SignOut'
import { ChatRoom } from 'components/ChatRoom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <ChatRoom />
    }
])

export function App() {
    const { auth } = useContext(AppContext)
    const [user, loading] = useAuthState(auth)

    return (
        <div className='App'>
            <header>
                <h1>React Firebase Chat</h1>
                <SignOut />
            </header>
            <section>
                {loading ? <>loading...</> : user ? <RouterProvider router={router} /> : <SignIn />}
            </section>
        </div>
    )
}
