import { AuthContext } from '@/services/contexts/auth/authContext'
import { UserContext } from '@/services/contexts/user/userContext'
import { useContext } from 'react'

const useAuthState = () => useContext(AuthContext)

const useUserState = () => useContext(UserContext)

const useGlobalState = () => ({
    ...useContext(AuthContext),
    ...useContext(UserContext),
})

export default useGlobalState
export { useAuthState, useUserState }
