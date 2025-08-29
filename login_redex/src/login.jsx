import { tryCatch } from 'ramda';
import { useEffect, useState } from 'react';
import { setUsername,setPassword,clearUser, validate,setUser, userFunctions} from './dataHandler/user/userMainSlice';
import { setSessionUser,setLocalUser,removeLocalUser,getLoginData as loginStatus,setLoginData } from './dataHandler/user/userSessionSlice';
import { getLoginData } from "./dataHandler/user/userStore";
import { useSelector, useDispatch } from 'react-redux';

import "./login.css"
import * as R from 'ramda'
import { isBlank } from './ramadaFunctions';


//Hello

export  default  function Login({getUser}) {

    const dispatch=useDispatch()
    const user=useSelector((state)=>({...state.user,...userFunctions}))
    const userSession=useSelector((state)=>state.userSession)

    const [rememberMe,setRememberMe] = useState(false)

    const [msg,setMsg]=useState(undefined)

 


    useEffect(()=>{

        if(userSession.user){
            dispatch(setUser(userSession.user))
           if(user.userName) getUser(user)
        }
        if(userSession.sessionUser){
            dispatch(setUser(userSession.sessionUser))
            if(user.userName) getUser(user)
        }

       // alert(user.userName)
 
      
    },[userSession.user,userSession.sessionUser,user.userName])

    useEffect(()=>{
       // dispatch(validate())
    },[user.userName,user.password])

    useEffect(()=>{
        setTimeout(()=>setMsg(undefined),5000)
    },[msg])

  


    return <div className='login'> <form >
        <h1>Login</h1>
        <h4>Enter Your UserName And Password</h4>
        <h5>{msg||""}</h5>
      
        <TextField 
        value={user.userName||''}
         onChange={(value)=>dispatch(setUsername(value))}
         label="User Name"
         placeholder="Enter Your UserName"
         inlineValidation={()=>user.error.userName||""}
         inlineRestrtiction={()=>user.block.userName||""}
         />

        <TextField 
         value={user.password||''}
         onChange={(value)=>dispatch(setPassword(value))}
         label="Password"
         placeholder="Enter Your Password"
         inlineValidation={()=>user.error.password||""}
         inlineRestrtiction={()=>user.block.password||""}
         type='password'
         />


        <div className='actionBar'>
        <button type='button' tabIndex={user.isEmpty()?-1:0} disabled={user.isEmpty()}    onClick={()=>{ dispatch(clearUser()) }}>clear</button>
        <button type='submit' tabIndex={user.isNotValid()?-1:0 } disabled={user.isNotValid()} onClick={(event)=>{
            getLoginData(user.userName,user.password).then((user)=>{
                if(rememberMe){
                    dispatch(setLocalUser(user))
                }else{
                    dispatch(setSessionUser(user))
                }
            }).catch((error)=>{
                setMsg(error.message)
            })
            event.preventDefault()

        }}>Submit</button>

        </div>
        <div className='footer'>

            <button type='button' onClick={()=>{
            setMsg("Forgot Password:Contact Admin +91 9876543210")
            }}>Forget Password?</button>


            <label >Remember Me <input type='checkbox' onChange={(e)=>{
                setRememberMe(e.currentTarget.checked)
            }} /></label>
        </div>
    </form></div>

};

function TextField({value,onChange,label,placeholder,inlineValidation,inlineRestrtiction,type='text'}){
  return <div className='textField'> 
    <label>{label}</label>
    <input type={type} onCopy={(e)=>{ if(type=='password') e.preventDefault() }} onCut={(e)=>{ if(type) e.preventDefault() }} onPaste={(e)=>{ if(type=='password') e.preventDefault() }} value={value} onChange={(e)=> {onChange(e.currentTarget.value)}} placeholder={placeholder} /> 
    {/* <button type="button" tabIndex={value?0:-1} disabled={!value} onClick={()=>{ onChange("")} }>X</button> */}
    <p>{inlineValidation&&R.isNotNil(inlineValidation(value))?inlineValidation(value):"Empty Validation Function"}</p>
    <p>{inlineRestrtiction&&R.isNotNil(inlineRestrtiction(value))?inlineRestrtiction(value):"Empty Validation Function"}</p>
    </div>
}










