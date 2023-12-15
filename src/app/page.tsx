'use client'

import useApiRequest from '@/hooks/useApiRequest'
import Login from '@/components/auth/Login'
import LogoutBtn from '@/components/auth/LogoutBtn'
import Signup from '@/components/auth/Signup'
import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import { AuthContext } from '@/providers/contexts/authContextProvider'
import { UserContext } from '@/providers/contexts/userContextProvider'

const Dashboard: NextPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const { auth } = useContext(AuthContext)
    const { user } = useContext(UserContext)
    const request = useApiRequest()

    const logExampleNote = () => {
        request('GET', '/user').then((res) => {
            res.json().then((data) => console.log(data))
        })
    }

    return (
        <>
            {auth.authStatus == 'AUTHORIZED' ? (
                <div>
                    <h1>
                        {user.firstName && (
                            <div>
                                {`Hello ${user.firstName} ${user.lastName}! You are logged in!`}
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
