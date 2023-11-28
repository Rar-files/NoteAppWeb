import useApiRequest from '@/app/hooks/useApiRequest'
import { setAuthTokenError, setAuthTokenSuccess } from '@/app/reducer/authSlice'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export type IFormLogin = {
    email: string
    password: string
}

const Login: FC = () => {
    const dispatch = useDispatch()
    const request = useApiRequest()
    const { handleSubmit, register } = useForm<IFormLogin>()

    const onLogin = (data: IFormLogin) => {
        request('POST', '/Auth/Local/Login', data).then((response) => {
            if (response.status !== 200) {
                dispatch(setAuthTokenError())
                return
            }

            response.json().then((data) => {
                dispatch(setAuthTokenSuccess(data.token))
            })
        })
    }

    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <input type="email" placeholder="Email" {...register('email')} />
            <input
                type="password"
                placeholder="Password"
                {...register('password')}
            />
            <button type="submit">Signup</button>
        </form>
    )
}

export default Login
