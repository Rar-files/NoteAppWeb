'use client'

import { useAuthState } from '@/hooks/useGlobalContext'
import { FC } from 'react'

const LogoutBtn: FC = () => {
    const { setAuthUnauthorized } = useAuthState()

    return <button onClick={() => setAuthUnauthorized()}>Logout</button>
}

export default LogoutBtn
