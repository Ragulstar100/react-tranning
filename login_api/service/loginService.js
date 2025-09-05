import { getLoginData } from "../dal/localDal.js"



export const loginService = async (req)=>{

    try{
    await getLoginData(req.userName,req.password)
    }catch(error){
    
        throw error.message
    }
    

}      