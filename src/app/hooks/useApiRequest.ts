import { selectAuthState } from '@/features/authSlice'
import { useSelector } from 'react-redux'

export default function useApiRequest() {
    const authState = useSelector(selectAuthState)
    const getAuthHeader = () => `Bearer ${authState.token}`

    const getBaseURL = () => {
        if (!process.env.NEXT_PUBLIC_API_URL)
            throw new Error('NEXT_PUBLIC_API_URL is not defined')

        if (typeof process.env.NEXT_PUBLIC_API_URL !== 'string')
            throw new Error('NEXT_PUBLIC_API_URL is not a string')

        if (process.env.NEXT_PUBLIC_API_URL.length === 0)
            throw new Error('NEXT_PUBLIC_API_URL is empty')

        return process.env.NEXT_PUBLIC_API_URL
    }

    async function Request(
        method: string,
        url: string,
        data: object = {},
        headers: object = {}
    ): Promise<Response> {
        const body = method !== 'GET' ? JSON.stringify(data) : null

        return fetch(getBaseURL() + url, {
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                Authorization: getAuthHeader(),
            },
            body: body,
        })
    }

    return Request
}
