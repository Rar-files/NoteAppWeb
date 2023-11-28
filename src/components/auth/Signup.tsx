import useApiRequest from '@/app/hooks/useApiRequest'
import { setAuthTokenError, setAuthTokenSuccess } from '@/app/reducer/authSlice'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export type IFormSignup = {
    email: string
    password: string
    firstName: string
    lastName: string
}

const Signup: FC = () => {
    const dispatch = useDispatch()
    const request = useApiRequest()
    const { handleSubmit, register } = useForm<IFormSignup>()

    const onSignup = (data: IFormSignup) => {
        request('POST', '/Auth/Local/Signup', data)
            .then((response) => {
                if (!response.ok) {
                    dispatch(setAuthTokenError())
                    return response.text().then((text) => {
                        throw new Error(text)
                    })
                }

                response.json().then((data) => {
                    dispatch(setAuthTokenSuccess(data.token))
                })
            })
            .catch((error) => console.log(error))
    }

    return (
        <form onSubmit={handleSubmit(onSignup)}>
            <input type="email" placeholder="Email" {...register('email')} />
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
        </form>
    )
}

export default Signup
