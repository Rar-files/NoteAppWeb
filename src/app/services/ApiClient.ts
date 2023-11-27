export class ApiClient {
    protected readonly baseUrl: string

    constructor() {
        if (!process.env.NEXT_PUBLIC_API_URL) {
            throw new Error('NEXT_PUBLIC_API_URL is not defined')
        }

        if (typeof process.env.NEXT_PUBLIC_API_URL !== 'string') {
            throw new Error('NEXT_PUBLIC_API_URL is not a string')
        }

        if (process.env.NEXT_PUBLIC_API_URL.length === 0) {
            throw new Error('NEXT_PUBLIC_API_URL is empty')
        }

        this.baseUrl = process.env.NEXT_PUBLIC_API_URL
    }

    public async request(
        method: string,
        url: string,
        data: object = {},
        headers: object = {}
    ): Promise<Response> {
        const authHeader = await this.getAuthHeader()

        console.log(this.baseUrl + url)
        console.log(authHeader)

        if (method === 'GET') {
            return fetch(this.baseUrl + url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader,
                },
            })
        }

        return fetch(this.baseUrl + url, {
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                Authorization: authHeader,
            },
            body: JSON.stringify(data),
        })
    }

    private async getAuthHeader() {
        return `Bearer ${process.env.NEXT_PUBLIC_TEMP_API_TOKEN as string}`
    }
}

let apiClient: ApiClient | null = null

export default function getApiClient() {
    if (apiClient === null) {
        apiClient = new ApiClient()
    }

    return apiClient
}
