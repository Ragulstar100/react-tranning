import { getLoginData } from "../dal/localDal.js"



export const loginService = async (req)=>{

    try{
    await getLoginData(req.userName,req.password)
    }catch(error){
        console.log(error.message)
        throw error.message
    }
    

}      