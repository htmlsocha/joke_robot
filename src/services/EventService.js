import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://v2.jokeapi.dev/joke/',
    headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON'
    }
})

export default {
    getEvents() {
        return apiClient.get('/Any?format=json&lang=en&amount=1')
    }
}