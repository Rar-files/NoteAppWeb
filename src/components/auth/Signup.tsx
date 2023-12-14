import useApiRequest from '@/hooks/useApiRequest'
import { setAuthTokenError, setAuthTokenAuthorized } from '@/reducer/authSlice'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export type IFormSignup = {
    email: string
    password: string
    firstName: string
    lastName: string
}

const Signup: FC = () => {
    const [userExist, setUserExist] = useState(false)

    const dispatch = useDispatch()
    const request = useApiRequest()
    const { handleSubmit, register } = useForm<IFormSignup>()

    const onSignup = (data: IFormSignup) => {
        if (userExist) return

        request('POST', '/auth/local/signup', data)
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text)
                    })
                }

                response.json().then((data) => {
                    dispatch(setAuthTokenAuthorized(data.token))
                })
            })
            .catch((error: Error) => {
                if (error.message === 'User with this email already exists') {
                    setUserExist(true)
                    dispatch(setAuthTokenError())
                    return
                }
            })
    }

    const clearUserExist = () => {
        if (userExist) setUserExist(false)
    }

    return (
        <form onSubmit={handleSubmit(onSignup)}>
            <input
                type="email"
                placeholder="Email"
                {...register('email')}
                onChange={clearUserExist}
            />
            <input
                type="password"
                placeholder="Password"
                {...register('password')}
            />
            <input
                type="text"
                placeholder="First Name"
                {...register('firstName')}
            />
            <input
                type="text"
                placeholder="Last Name"
                {...register('lastName')}
            />
            <button type="submit">Signup</button>
            {userExist && (
                <div style={{ color: 'red' }}>
                    User with this email already exists, please login.
                </div>
            )}
        </form>
    )
}

export default Signup
