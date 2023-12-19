import { jwtDecode } from 'jwt-decode'

const useJWTHelpers = () => {
    const tokenToExpDate = (token: string) => {
        const jwtdecoded = jwtDecode(token)
        const expDate = new Date()
        expDate.setSeconds(expDate.getSeconds() + (jwtdecoded.exp as number))
        return expDate.toISOString()
    }

    return { tokenToExpDate }
}

export { useJWTHelpers }
