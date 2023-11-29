import useApiRequest from '@/app/hooks/useApiRequest'
import {
    AuthStatus,
    selectAuthState,
    trySetAuthTokenFromCookie,
} from '@/app/reducer/authSlice'
import Login from '@/components/auth/Login'
import LogoutBtn from '@/components/auth/LogoutBtn'
import Signup from '@/components/auth/Signup'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard: NextPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const authState = useSelector(selectAuthState)
    const apiRequest = useApiRequest()
    const dispatch = useDispatch()

    const logExampleNote = () => {
        apiRequest('GET', '/User').then((res) => {
            res.json().then((data) => console.log(data))
        })
    }

    useEffect(() => {
        if (authState.authStatus == AuthStatus.UNAUTHORIZED)
            dispatch(trySetAuthTokenFromCookie())
    })

    return (
        <div>
            <h1>Hello world!</h1>
            <div>
                {authState.authStatus == AuthStatus.AUTHORIZED
                    ? 'Logged in'
                    : 'Not Logged In'}
            </div>

            <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? 'SignupForm' : 'LoginForm'}
            </button>

            {showLogin ? <Login /> : <Signup />}

            {authState.authStatus == AuthStatus.AUTHORIZED && (
                <div>
                    <LogoutBtn />
                    <button onClick={logExampleNote}>Log users</button>
                </div>
            )}
        </div>
    )
}

export default Dashboard
