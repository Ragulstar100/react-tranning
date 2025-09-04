
import { useEffect, useState } from 'react';
import { setUsername,setPassword,clearUser, setUser, userFunctions} from './dataHandler/user/userMainSlice';
import { setSessionUser,setLocalUser,getLoginData as loginStatus,setLoginData } from './dataHandler/user/userSessionSlice';
import { getLoginData } from "./dataHandler/user/userStore";
import { useSelector, useDispatch } from 'react-redux';
import { invalidUser } from './dataHandler/user/userMiddleware';
import { TextField } from './component /common_components/textField';


import "./login.css"
import { faCircleUser, faHourglass3,faKey} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//Hello

export  default  function Login({getUser}) {

    const dispatch=useDispatch()
    const user=useSelector((state)=>({...state.user,...userFunctions}))
    const userSession=useSelector((state)=>state.userSession)

    const [rememberMe,setRememberMe] = useState(false)

    const [msg,setMsg]=useState(undefined)

    useEffect(()=>{
        dispatch(setUser({}))
    },[])

 


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
         inlineValidation={()=>user.error[setUsername.type]||""}
         inlineRestrtiction={()=>user.block[setUsername.type]||""}
         leadingIcon={<FontAwesomeIcon icon={faCircleUser} size='lg' />}
         />


        <TextField 
         value={user.password||''}
         onChange={(value)=>dispatch(setPassword(value))}
         label="Password"
         placeholder="Enter Your Password"
         inlineValidation={()=>user.error[setPassword.type]||""}
         inlineRestrtiction={()=>user.block[setPassword.type]||""}
         leadingIcon={<FontAwesomeIcon icon={faKey} size='lg' />}
         type='password'
         />


        <div className='actionBar'>
        <button type='button' tabIndex={user.isEmpty()?-1:0} disabled={user.isEmpty()}    onClick={()=>{ dispatch(clearUser()) }}>clear</button>
        <button type='submit' tabIndex={invalidUser(user)?-1:0 } disabled={invalidUser(user)} onClick={(event)=>{
        
            getLoginData(user.userName,user.password).then((user)=>{
                if(rememberMe){
                    dispatch(setLocalUser(user))
                }else{
                    dispatch(setSessionUser(user))
                }
            }).catch((error)=>{
                setMsg(error)
            })
    
            event.preventDefault()

        }}>Submit</button>

        </div>
        <footer>

            <button type='button' onClick={()=>{
            setMsg("Forgot Password:Contact Admin +91 9876543210")
            }}>Forget Password?</button>


            <label >Remember Me <input type='checkbox' onChange={(e)=>{
                setRememberMe(e.currentTarget.checked)
            }} /></label>
        </footer>
    </form></div>

};












