import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'contexts/AppContext'
import { SignIn } from 'components/SignIn/SignIn'
import { SignOut } from 'components/SignOut/SignOut'
import { ChatRoom } from 'pages/ChatRoom/ChatRoom'
import './App.scss'
import { ExamplePage } from 'pages/Example/ExamplePage'
import { NestedContextProvider } from 'contexts/NestedContext'

const router = createBrowserRouter([
    {
        path: '/',
        element: <ChatRoom />
    },
    {
        path: '/example',
        element: <ExamplePage greeting='Hello' count={1} className='my-custom-class' />
    }
])

export function App() {
    const { user, loading } = useContext(AppContext)

    return (
        <div className='App'>
            <NestedContextProvider>
                <header>
                    <h1>React Firebase Chat</h1>
                    {user && <SignOut />}
                </header>
                <section>
                    {loading ? <></> : user ? <RouterProvider router={router} /> : <SignIn />}
                </section>
            </NestedContextProvider>
        </div>
    )
}
