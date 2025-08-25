import { tryCatch } from 'ramda';
import { useEffect, useState } from 'react';
import { setUsername,setPassword,clearUser, validate, restrict, userNotEmpty } from './redex/user/userSetSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginData } from './redex/user/userStore';
import "./login.css"
import * as R from 'ramda'
import { isBlank } from './ramadaFunctions';



export  default  function Login() {

    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user)
    const finsh=useSelector((state)=>state.userSummit)

    useEffect(()=>{
        dispatch(validate())
    },[user.userName,user.password])


    return <form className='login'>
        <h1>Login</h1>
        <h2>Enter Your UserName And Pssword</h2>
      
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

        <div className='end'>
        <button type='button' tabIndex={isBlank(user.userName)&&isBlank(user.userName)?-1:0} disabled={isBlank(user.userName)&&isBlank(user.userName)}    onClick={()=>{ dispatch(clearUser()) }}>clear</button>
        <button type='submit' tabIndex={!isBlank(user.error)} disabled={!isBlank(user.error)} onClick={()=>{
            getLoginData(user.userName,user.password).then((user)=>{
                alert("Sucess")
            }).catch((error)=>{
                alert("Failed")
            })
        }}>Submit</button>
        </div>
    </form>

};

function TextField({value,onChange,label,placeholder,inlineValidation,inlineRestrtiction,type='text'}){
  return <div className='textField'> 
    <label>{label}</label>
    <input type={type} value={value} onChange={(e)=> {onChange(e.currentTarget.value)}} placeholder={placeholder} /> 
    <button type="button" tabIndex={value?0:-1} disabled={!value} onClick={()=>{ onChange("")} }>X</button>
    <p>{inlineValidation&&R.isNotNil(inlineValidation(value))?inlineValidation(value):"Empty Validation Function"}</p>
    <p>{inlineRestrtiction&&R.isNotNil(inlineRestrtiction(value))?inlineRestrtiction(value):"Empty Validation Function"}</p>
    </div>
}







