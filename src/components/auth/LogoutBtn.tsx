import { setAuthTokenUnauthorized } from '@/reducer/authSlice'
import { FC } from 'react'
import { useDispatch } from 'react-redux'

const LogoutBtn: FC = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(setAuthTokenUnauthorized())}>
            Logout
        </button>
    )
}

export default LogoutBtn
