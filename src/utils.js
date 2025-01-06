import router from '@/router'

export const getTokenAndCheckIfUserExist = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(!user) {
        router.push("/signup")
        return null
    }
    return user.token
}