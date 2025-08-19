import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashScreen from './splash'


const setUser = (user) => localStorage.setItem("user", JSON.stringify(user))

const getUser = () => JSON.parse(localStorage.getItem("user"))

const removeUser = () => localStorage.removeItem("user")

const setSessionUser = (user) => sessionStorage.setItem("users", JSON.stringify(user))

const getSessionUser = () => JSON.parse(sessionStorage.getItem("users"))

const removeSessionUser = () => sessionStorage.removeItem("users")

const logindata = {
    userName: "admin",
    token: "none",
    loginSuccess: false,
    time: Date.now(),
    nuperOfLoginAttempt: 0,
    rememberMe: false,
}

const setLoginData = (data) => localStorage.setItem("loginData" + data.userName, JSON.stringify(data));

const getLoginData = (data) => localStorage.getItem("loginData" + data.userName) ? localStorage.getItem("loginData" + data.userName) : null;

const removeLoginData = (data) => localStorage.removeItem("loginData" + data.userName);








function App() {

    const [auth, setAuth] = useState(getUser()||getSessionUser())


    if (!auth) {
        return<div className='flex flex-col w-screen h-full'><p className=' text-center w-full py-5 '>Welcome My Game Analystics Website</p> <Login className="text-center   m-auto" _setUser={(auth) => {
            setAuth(auth)
        }} /></div>

    } else {
        return <SplashScreen>

            <div className='w-screen self-start p-5 flex justify-between items-center'>
                <p className=''>Welcome {auth.userName}</p>
                <button type='button' onClick={() => {
                    removeUser()
                    removeSessionUser()
                    window.location.reload();//Totally Website Reload with splash screen
                }}>
                    LogOut
                </button>
            </div>  </SplashScreen>
    }


}

function validate() {

    const { userName, password } = this
    const validateArray = new Array(Object.keys(this).length)


    if (userName.length > 20) {
        validateArray[0] = "Length Exceed UseName"
    }
    else if (/[`"']/.test(userName)) {
        validateArray[0] = "Not Accept \`\'\""
    }

    if (password.length > 10) {
        validateArray[1] = "Length Exceed Password"
    }
    else if (/[`"']/.test(password)) {
        validateArray[1] = "Not Accept \`\'\""
    }



    return validateArray

}


function validate1(finalValidation, showInputValidateError) {

    const { userName, password } = this
    const validateArray = new Array(Object.keys(this).length)

    // if(showInputValidateError===undefined) {
    //     throw "Enter showInputValidateError"
    // }

    if (showInputValidateError) {
        //UserName Validate
        if (!userName && userName.trim() == '') {
            validateArray[0] = "User Name Is Empty"
        }


        //Password Validate
        if (!password && password.trim() == '') {
            validateArray[1] = "Your Password Is Empty"
        }

        //Final Validate

        fetch("/auth.json").then(res => res.json()).then((userList) => {

            if (finalValidation) {
                if (userList.filter((user) => user.userName == userName && user.password == password).length == 0) {
                    finalValidation("User Name Or PassWord Invalid")
                } else {
                    finalValidation(undefined)
                }
            }
        }
        ).catch((error) => { throw error })

    }

    return validateArray

}




function Login({ _setUser,className,rememberMe }) {

    const validatRef = useRef(false)
    const [auth, setAuth] = useState({ userName: "", password: "", validate, validate1 })

    const [_rememberMe,setRememberMe]=useState(false)

    

    return <form className={'size-100 shadow-2xl rounded-2xl flex flex-col items-center gap-2 '+className}>
        <p className='w-full text-4xl text-center pt-5'>Login</p>

        {/*User Name*/}
        <label className='flex items-center gap-2 p-2'> UserName <input placeholder='Enter user Name' autoFocus type="text" value={auth.userName} onChange={(name) => {
            let _auth = { ...auth, userName: name.target.value }
            if (!_auth.validate()[0]) setAuth(_auth)
        }

        } className='pl-5 py-2 text-xl border-2 border-gray-300  focus:outline-cyan-400' /> </label>
        <p className='text-red-400 h-5'>{auth.validate1(undefined, validatRef.current)[0] || ''}</p>

        {/*Password*/}
        <label className='flex items-center gap-2'> Password <input type="password" placeholder='Enter Password' value={auth.password} onChange={(pas) => {
            let _auth = { ...auth, password: pas.target.value }
            if (!_auth.validate()[1]) setAuth(_auth)

        }} className='pl-5 py-2 text-xl border-2 border-gray-300  focus:outline-cyan-400' onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()} onPaste={(e) => { e.preventDefault() }} /> </label>
        <p className='text-red-400 h-5'>{auth.validate1(useEffect, validatRef.current)[1] || ''}</p>


        <button type='button' className=" bg-cyan-400 rounded-2xl text-2xl self-end mr-5 mb-5 mt-auto p-3" onClick={() => {
            validatRef.current = true
        
       

          if(auth.validate1(undefined,validatRef.current).filter((e)=>e).length==0) {
           auth.validate1((value) => {

                alert(value)
                let loginDataRaw = getLoginData(auth);
                let loginData = loginDataRaw ? JSON.parse(loginDataRaw) : { userName: auth.userName, time: Date.now(), nuperOfLoginAttempt: 0 };
                let nuperOfLoginAttemptTotal=3
                let timeFinshed =  60 * 1000;

                if ((Date.now() - loginData.time) > timeFinshed && loginData.nuperOfLoginAttempt == 3) {
                    loginData.nuperOfLoginAttempt = 0; // Reset attempts after One minute
                }
        

                if (loginData.nuperOfLoginAttempt < nuperOfLoginAttemptTotal) {
                    if (value) {
                        alert(value + " nuperOfLoginAttempt only " + (nuperOfLoginAttemptTotal - 1 - loginData.nuperOfLoginAttempt));
                        loginData.nuperOfLoginAttempt = (loginData.nuperOfLoginAttempt || 0) + 1;
                        loginData.time = Date.now();
                        setLoginData(loginData);
                    } else {
                        loginData.nuperOfLoginAttempt = 0; // Reset attempts on successful login
                        loginData.time = Date.now();
                       if(_rememberMe){
                        setLoginData(loginData);
                        setUser(auth) 
                       }else{
                        setLoginData(loginData);
                        setSessionUser(auth)
                
                       }

                        _setUser(auth);
                    }
                } else {
                    const nextDay = new Date(loginData.time + timeFinshed);
                    // nextDay.setDate(nextDay.getDate() + 1);
                    const formattedDate = `${String(nextDay.getDate()).padStart(2, '0')}/${String(nextDay.getMonth() + 1).padStart(2, '0')}/${nextDay.getFullYear()} at ${String(nextDay.getHours()).padStart(2, '0')}:${String(nextDay.getMinutes()).padStart(2, '0')}`;
                    alert(`${loginData.userName} have exceeded the maximum number of login attempts. Please try again ${formattedDate}.`);
                }

            }, validatRef.current)

        }else{
            alert("Enter All The Textbox Currectly")
        }

         setAuth(prevAuth => ({
                ...prevAuth,
            }));
        


        }}>Submit</button>

      <div className='flex h-10 w-full justify-around items-center'><button onClick={()=>alert("Please Contact +91 6382174793")}>Forgot Password</button> <label className='  mr-5'>Remember Me <input type="checkbox" onChange={(e)=>setRememberMe(e.currentTarget.value)} value={_rememberMe} /></label></div>


    </form>
}

export default App