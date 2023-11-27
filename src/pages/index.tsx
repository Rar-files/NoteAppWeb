import getApiClient from '@/app/services/ApiClient'
import type { NextPage } from 'next'
import { useEffect } from 'react'

const Dashboard: NextPage = () => {
    useEffect(() => {
        getApiClient()
            .request('GET', '/Note/3')
            .then((res) => {
                res.json().then((data) => console.log(data))
            })
    })
    return <h1>Hello world!</h1>
}

export default Dashboard
