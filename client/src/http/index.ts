import axios from "axios"

export const API_URL = 'http://localhost:5000'

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL
})