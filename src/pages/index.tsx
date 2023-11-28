import useApiRequest from '@/app/hooks/useApiRequest'
import { setAuthState, selectAuthState } from '@/features/authSlice'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard: NextPage = () => {
    const authState = useSelector(selectAuthState)
    const dispatch = useDispatch()
    const apiRequest = useApiRequest()

    const toggleAuthState = () => {
        authState.succeeded
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
    }

    const logExampleNote = () => {
        apiRequest('GET', '/Note/3').then((res) => {
            res.json().then((data) => console.log(data))
        })
    }

    useEffect(() => {})
    return (
        <div>
            <h1>Hello world!</h1>
            <div>{authState.succeeded ? 'Logged in' : 'Not Logged In'}</div>
            <button onClick={toggleAuthState}>
                {authState.succeeded ? 'Logout' : 'LogIn'}
            </button>

            {authState.succeeded && (
                <button onClick={logExampleNote}>Log Example Note</button>
            )}
        </div>
    )
}

export default Dashboard
