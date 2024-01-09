'use client'

import { useApiRequest } from '@/hooks/useApiRequest'
import Login from '@/components/auth/login'
import LogoutBtn from '@/components/auth/logout-btn'
import Signup from '@/components/auth/signup'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useGlobalContext } from '@/hooks/useGlobalContext'

const Dashboard: NextPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const { auth, user } = useGlobalContext()
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
