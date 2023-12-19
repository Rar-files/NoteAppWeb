'use client'

import { useApiRequest } from '@/hooks/useApiRequest'
import Login from '@/components/auth/Login'
import LogoutBtn from '@/components/auth/LogoutBtn'
import Signup from '@/components/auth/Signup'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useGlobalContext } from '@/hooks/useGlobalContext'
import { useTheme } from 'next-themes'

const Dashboard: NextPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const { auth, user } = useGlobalContext()
    const request = useApiRequest()
    const { theme, setTheme } = useTheme()

    const logExampleNote = () => {
        request('GET', '/user').then((res) => {
            res.json().then((data) => console.log(data))
        })
    }

    return (
        <>
            <button
                className={`w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]`}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                {theme === 'light' ? 'Dark' : 'Light'}
            </button>
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
