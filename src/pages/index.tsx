import useApiRequest from '@/hooks/useApiRequest'
import { selectAuthState, trySetAuthTokenFromLS } from '@/reducer/authSlice'
import { clearUser, selectUserState, setUser } from '@/reducer/userSlice'
import Login from '@/components/auth/Login'
import LogoutBtn from '@/components/auth/LogoutBtn'
import Signup from '@/components/auth/Signup'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard: NextPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const authState = useSelector(selectAuthState)
    const userState = useSelector(selectUserState)
    const request = useApiRequest()
    const dispatch = useDispatch()

    const logExampleNote = () => {
        request('GET', '/user').then((res) => {
            res.json().then((data) => console.log(data))
        })
    }

    useEffect(() => {
        if (authState.authStatus == 'UNAUTHORIZED')
            dispatch(trySetAuthTokenFromLS())
    })

    if (authState.authStatus == 'AUTHORIZED') {
        request('GET', '/user/me').then((response) => {
            if (!response.ok) {
                dispatch(clearUser())
                return
            }

            response.json().then((data) => {
                dispatch(setUser(data))
            })
        })
    }

    return (
        <>
            {authState.authStatus == 'AUTHORIZED' ? (
                <div>
                    <h1>
                        {userState && (
                            <div>
                                {`Hello ${userState.firstName} ${userState.lastName}! You are logged in!`}
                            </div>
                        )}
                    </h1>
                    <LogoutBtn />
                    <button onClick={logExampleNote}>Log users</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setShowLogin(!showLogin)}>
                        {showLogin ? 'SignupForm' : 'LoginForm'}
                    </button>

                    {showLogin ? <Login /> : <Signup />}
                </div>
            )}
        </>
    )
}

export default Dashboard
