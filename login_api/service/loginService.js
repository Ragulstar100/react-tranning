import e from "cors"
import { getLoginData } from "../dal/localDal.js"

export const loginService = async (req) => {
    try {
        await getLoginData(req.userName, req.password)
    } catch (error) {
        console.error("Could not Accept Login Request",error)
        throw error.message
    }
}