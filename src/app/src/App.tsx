import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useContext } from 'react'
import { FirebaseAppContext } from 'contexts/FirebaseAppContext'
import { SignIn } from 'components/SignIn/SignIn'
import { SignOut } from 'components/SignOut/SignOut'
import { ChatRoom } from 'pages/ChatRoom/ChatRoom'
import './App.scss'

const router = createBrowserRouter([
    {
        path: '/',
        element: <ChatRoom />
    }
])

export function App() {
    const { user, userIsLoading } = useContext(FirebaseAppContext)

    return (
        <div className='App'>
            <header>
                <h1>React Firebase Chat!!</h1>
                {user && <SignOut />}
            </header>
            <section>
                {userIsLoading ? <></> : user ? <RouterProvider router={router} /> : <SignIn />}
            </section>
        </div>
    )
}
