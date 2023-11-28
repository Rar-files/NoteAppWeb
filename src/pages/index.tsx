import useApiRequest from '@/app/hooks/useApiRequest'
import { selectAuthState } from '@/app/reducer/authSlice'
import Signup from '@/components/auth/Signup'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Dashboard: NextPage = () => {
    const authState = useSelector(selectAuthState)
    const apiRequest = useApiRequest()

    const logExampleNote = () => {
        apiRequest('GET', '/User').then((res) => {
            res.json().then((data) => console.log(data))
        })
    }

    useEffect(() => {})
    return (
        <div>
            <h1>Hello world!</h1>
            <div>{authState.succeeded ? 'Logged in' : 'Not Logged In'}</div>

            <Signup />

            {authState.succeeded && (
                <button onClick={logExampleNote}>Log users</button>
            )}
        </div>
    )
}

export default Dashboard
