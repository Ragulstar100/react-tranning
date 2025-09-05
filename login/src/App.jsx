import React, { useEffect, useState } from 'react'
import './App.css'

import * as R from 'ramda'


import { getSessionUser, setSessionUser, removeSessionUser,getUser,setUser,removeUser,setLoginData,getLoginData } from './sessionHandler'

import { or, and, isBlank, isMatch } from './ramadaFunctions'

//const removeLoginData = (data) => localStorage.removeItem("loginData" + data.userName);



function App() {

    const [auth, setAuth] = useState(getUser() || getSessionUser())

    if (!auth) {
        return <div className='flex flex-col w-screen h-full'><p className=' text-center w-full py-5 '>Welcome gaming analytics</p> <Login className="text-center   m-auto" _setUser={(auth) => {
            setAuth(auth)
        }} /></div>

    } else {

        return  <div className='w-screen self-start p-5 flex justify-between items-center'>
                <p className=''>Welcome {auth.userName}</p>
                <button type='button' onClick={() => {
                    removeUser()
                    removeSessionUser()
                    window.location.reload();//Totally Website Reload with splash screen
                }}>
                    LogOut
                </button>
                 </div> 
    }

}


const userNameRegex = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*$/;
const userNameRegex1 = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*_$/;

function validate() {

    const { userName, password } = this
    const validateArray = new Array(Object.keys(this).length)


    if (!and(isMatch(/^(?!_).*/),or(isMatch(userNameRegex), isMatch(userNameRegex1)))(userName)) {
        validateArray[0] = "1.UserName Should Start With A-Z, a-z, 0-9 \n 2.Can Contain _ But Not At The End Or Start \n 3.Special Characters Not Allowed";
    } else if (userName&&userName.length > 20) {
        validateArray[0] = "Length Exceed UserName";
    }


    if (password&&password.length > 10) {
        validateArray[1] = "Length Exceed Password"
    }


    

    return validateArray

}


function validate1( showinputValidate) {


    const { userName, password } = this
    const validateArray = new Array(Object.keys(this).length)



    if (showinputValidate) {
        //UserName Validate
        if (isBlank(userName)) {
            validateArray[0] = "User Name Is Empty"
        } else if (isMatch(userNameRegex1)(userName)) {
            validateArray[0] = "User Name Should Not End With _"
        }

        //Password Validate
        if (isBlank(password)) {
            validateArray[1] = "Your Password Is Empty"
        }
    }

    return validateArray

}

function finalValidation(_user,validate){

        let userCheck = (user) => user.userName == _user.userName && user.password == _user.password
        


        fetch("private/auth.json").then(res => res.json()).then((userList) => {

        
            if (!R.find( userCheck,userList)) {
                    validate("User Name Or PassWord Invalid")
                } else { 
                    validate(undefined)
                }
        }
        ).catch((error) => { throw error })

}

function Login({ _setUser, className }) {


    const [auth, setAuth] = useState({ userName:undefined, password:undefined, validate, validate1})
    const [authCache, setAuthCache] = useState({ userName: undefined, password: undefined, validate, validate1 })

    const [_rememberMe, setRememberMe] = useState(false)

    const clearFields = () => {
        setAuth((auth1) => {
            return { ...auth1, userName: "", password: "" }
        })
    }

    const inputValidate = (_auth) =>  _auth.validate1(true).filter((e)=>e).length == 0 

    const inputFieldAnyEmpty = (_auth) => isBlank(_auth.userName) && isBlank(_auth.password)

    const handleForgotPassword = () =>  alert("Please contact support for password recovery: +91 6382174793");
    
    const submit=()=>{
                    
                if (inputValidate(auth)) {

                    finalValidation(auth,(isNotFinsh) => {
                     
                        

                        let loginDataRaw = getLoginData(auth);
                        let loginData = loginDataRaw ? JSON.parse(loginDataRaw) : { userName: auth.userName, time: Date.now(), nuperOfLoginAttempt: 0 };
                        let nuperOfLoginAttemptTotal = 3
                        let timeFinshed = 60 * 1000;

                        if ((Date.now() - loginData.time) > timeFinshed && loginData.nuperOfLoginAttempt == 3) {
                            loginData.nuperOfLoginAttempt = 0; // Reset attempts after One minute
                        }


                        if (loginData.nuperOfLoginAttempt < nuperOfLoginAttemptTotal) {
                            if (isNotFinsh) {
                                alert(isNotFinsh + " nuperOfLoginAttempt only " + (nuperOfLoginAttemptTotal - 1 - loginData.nuperOfLoginAttempt));
                                loginData.nuperOfLoginAttempt = (loginData.nuperOfLoginAttempt || 0) + 1;
                                loginData.time = Date.now();
                                setLoginData(loginData);
                            } else {
                                loginData.nuperOfLoginAttempt = 0; // Reset attempts on successful login
                                loginData.time = Date.now();
                                if (_rememberMe) {
                                    setLoginData(loginData);
                                    setUser(auth)
                                } else {
                                    setLoginData(loginData);
                                    setSessionUser(auth)

                                }

                                _setUser(auth);
                            }
                        } else {
                            const nextDay = new Date(loginData.time + timeFinshed);
                            const formattedDate = `${String(nextDay.getDate()).padStart(2, '0')}/${String(nextDay.getMonth() + 1).padStart(2, '0')}/${nextDay.getFullYear()} at ${String(nextDay.getHours()).padStart(2, '0')}:${String(nextDay.getMinutes()).padStart(2, '0')}`;
                            alert(`${loginData.userName} have exceeded the maximum number of login attempts. Please try again ${formattedDate}.`);
                        }
                    }

                    )

                }

                setAuth(prevAuth => ({
                    ...prevAuth,
                }));
    }


    useEffect(() => {
        if ( !authCache.validate()[0]&&!authCache.validate()[1]) {
                setAuth(authCache);
         }  
    }, [authCache.userName, authCache.password]);

    return (
      <div>  <form className={`login-form-container ${className}`}>
            <h1 className="login-heading">Login</h1>
            <p className="login-subheading">Please Enter Your Username And Password</p>

            
            <div className="textField ">
            <label >
                Username
            </label>
                     <input placeholder='Enter username'
                    autoFocus
                    tabIndex={0}
                    type="text"
                    value={auth.userName || ""}
                    onChange={(e) => {
                        let _auth = { ...auth, userName: e.target.value };
                        setAuthCache(_auth);

                    }}
                    />
                          
            <p >{authCache.validate()[0]||auth.validate1(R.isNotNil(auth.userName))[0]}</p>
            </div>        

             <div className="textField">       
            <label > Password </label>
                <input
                    type="password"
                    placeholder='Enter password'
                    value={auth.password || ""}
                    onChange={(e) => {
                        let _auth = { ...auth, password: e.target.value };
                        setAuthCache(_auth);
                    }}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                />
                
            <p >{auth.validate1(R.isNotNil(auth.password))[1]||(authCache.validate()[1])}</p>
            </div>        
            
            <div className="login-button-group">
                <button
                    type='button'
                    tabIndex={inputFieldAnyEmpty(auth) ? -1 : 0}
                    onClick={clearFields}
                    className="login-button login-clear-button"
                    disabled={inputFieldAnyEmpty(auth)}
                >
                    Clear
                </button>
                <button
                    type='submit'
                    tabIndex={inputValidate(auth) ? 0 : -1}
                    className="login-button login-submit-button"
                    onClick={(event) => { submit();event.preventDefault(); }}
                    disabled={!inputValidate(auth)}
                >
                    Submit
                </button>
            </div>

            <div className="login-forgot-remember">
                <button type="button" onClick={handleForgotPassword}>Forgot Password</button>
                <label className='mr-5'> Remember Me
                    <input type="checkbox" onChange={(e) => setRememberMe(e.currentTarget.checked)} checked={_rememberMe} />
                </label>
            </div>
        </form></div>
    );
}

export default App