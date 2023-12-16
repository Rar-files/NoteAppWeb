'use client'

import { useAuthState } from '@/hooks/useGlobalState'
import { FC } from 'react'

const LogoutBtn: FC = () => {
    const { setAuthUnauthorized } = useAuthState()

    return <button onClick={() => setAuthUnauthorized()}>Logout</button>
}

export default LogoutBtn
