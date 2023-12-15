'use client'

import { AuthContext } from '@/providers/contexts/authContextProvider'
import { FC, useContext } from 'react'

const LogoutBtn: FC = () => {
    const { setAuthUnauthorized } = useContext(AuthContext)

    return <button onClick={() => setAuthUnauthorized()}>Logout</button>
}

export default LogoutBtn
