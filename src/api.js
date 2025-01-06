import axios from "axios"

const url = 'https://taskmanagerms-hbb3uppc.b4a.run'

export const signupUser = async (dataUser) => {
    try {
        const res = await axios.post(`${url}/api/v1/auth/register`, dataUser)
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const loginUser = async (dataUser) => {
    try {
        const res = await axios.post(`${url}/api/v1/auth/login`, dataUser)
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
}