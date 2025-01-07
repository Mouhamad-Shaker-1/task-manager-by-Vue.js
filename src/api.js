import axios from "axios"
import { getTokenAndCheckIfUserExist } from "./utils"

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


export const getAllTasksFromAPI = async () => {
    const token = getTokenAndCheckIfUserExist()
    try {
        const res = await axios.get(`${url}/api/v1/tasks`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
}