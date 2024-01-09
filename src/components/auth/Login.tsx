'use client'

import { useApiRequest } from '@/hooks/useApiRequest'
import { useAuthState } from '@/hooks/useGlobalContext'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

export type IFormLogin = {
    email: string
    password: string
}

const Login: FC = () => {
    const [formError, setFormError] = useState('')
    const { setAuthAuthorized, setAuthError } = useAuthState()

    const request = useApiRequest()
    const { handleSubmit, register } = useForm<IFormLogin>()

    const onLogin = (data: IFormLogin) => {
        if (formError) return

        request('POST', '/auth/local/login', data).then((response) => {
            if (!response.ok) {
                setAuthError()
                if (response.status === 401) {
                    setFormError('Wrong password')
                    return
                }
                if (response.status === 404) {
                    setFormError('User not found, please signin.')
                    return
                }
                return
            }

            response.json().then((data) => {
                setAuthAuthorized(data.token)
            })
        })
    }

    const clearFormError = () => {
        if (formError) setFormError('')
    }

    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <input
                type="email"
                placeholder="Email"
                {...register('email')}
                onChange={clearFormError}
            />
            <input
                type="password"
                placeholder="Password"
                {...register('password')}
                onChange={clearFormError}
            />
            <button type="submit">Login</button>
            {formError && <div style={{ color: 'red' }}>{formError}</div>}
        </form>
    )
}

export default Login
