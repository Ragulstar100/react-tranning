import { loginService } from "../service/loginService.js"



export const loginController= async (req,res) =>{
    try{
    await loginService(req.body)   
    res.status(200).json({msg:"sucess"})
    }
    catch(error){
    res.status(400).json({error:error})    
    }
    
}  