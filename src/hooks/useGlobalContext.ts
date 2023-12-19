import { AuthContext } from '@/services/contexts/authContext'
import { UserContext } from '@/services/contexts/userContext'
import { useContext } from 'react'

const useAuthState = () => useContext(AuthContext)

const useUserState = () => useContext(UserContext)

const useGlobalContext = () => ({
    ...useContext(AuthContext),
    ...useContext(UserContext),
})

export { useGlobalContext, useAuthState, useUserState }
