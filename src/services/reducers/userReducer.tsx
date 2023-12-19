import { IUser, getEmptyUser } from '@/interfaces/IUser'
import { Dispatch, SetStateAction } from 'react'

const GetUserReducer = ({
    user,
    setUser,
}: {
    user: IUser
    setUser: Dispatch<SetStateAction<IUser>>
}) => {
    //Addicional actions
    const clearUser = () => {
        setUser(getEmptyUser())
    }

    return { user, setUser, clearUser }
}

export { GetUserReducer }
