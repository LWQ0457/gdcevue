import axios from 'axios'

const instance = axios.create({
    baseURL: '/api'
})

export {
    instance as axios
}