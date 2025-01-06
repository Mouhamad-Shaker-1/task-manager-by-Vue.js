import axios from "axios"

const url = 'https://taskmanagerms-hbb3uppc.b4a.run'

export const signupUser = async (dataUser) => {
    try {
        const req = await axios.post(`${url}/api/v1/auth/register`, dataUser)
        return req.data
    } catch (error) {
        throw new Error(error.message)
    }
}