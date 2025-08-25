import { createSlice } from '@reduxjs/toolkit';
import { isBlank,isMatch,isNotMatch,andFunction,orFunction } from '../../ramadaFunctions';
import { useEffect } from 'react';
import { isNotEmpty } from 'ramda';

export const initialState = {
  userName:undefined,
  password:undefined,
  error:{},
  block:{},
  cache:undefined
};

const useSetSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    setUsername: (state, action) => { 
     if(!_restrict({...state,userName:action.payload}).userName)   state.userName=action.payload 
     state.block=_restrict({...state,userName:action.payload})
    },
    setPassword: (state, action) => {
     if(!_restrict({...state,password:action.payload}).password)   state.password=action.payload 
     state.block=_restrict({...state,password:action.payload})
    },
    clearUser: (state) => {
      state.userName = undefined;
      state.password = undefined;
    },
    validate:(state,action)=>{
        state.error=_validate(state,action)
    },
    restrict:(state)=>{
        state.block=_restrict(state)
    },
    userNotEmpty:(state)=>{
       return isNotEmpty(state.userName)||isNotEmpty(state.password)
    }

  },
});




function _validate(state,showinputValidate) {


    const { userName, password } = state
    const validate = {}

  

    if (showinputValidate) {

       
        //UserName Validate
        if (userName!==undefined&&isBlank(userName)) {
            validate.userName = "User Name Is Empty"
         
        } else if (userName!==undefined&&isMatch(userNameRegex1)(userName)) {
            validate.userName = "User Name Should Not End With _"
        }

        //Password Validate
        if (password!==undefined&&isBlank(password)) {
            validate.password = "Your Password Is Empty"
        }

       return validate

    }



}


const userNameRegex = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*$/;
const userNameRegex1 = /^[A-Za-z0-9]*(_[A-Za-z0-9]+)*_$/;

function _restrict(state) {

    const { userName, password } = state
    const validateArray = {}


    if (!andFunction(isMatch(/^(?!_).*/),orFunction(isMatch(userNameRegex), isMatch(userNameRegex1)))(userName)) {
        validateArray.userName = "Username must start with a letter or number, may contain underscores (not at the start or end), and cannot have special characters.";
    } else if (userName&&userName.length > 20) {
        validateArray.userName = "Length Exceed UserName";
    }


    if (password&&password.length > 10) {
        validateArray.password = "Length Exceed Password"
    }

 
   // alert(JSON.stringify(state))

    return validateArray

}

export const { setUsername, setPassword, clearUser,validate,restrict,userNotEmpty,setUser } = useSetSlice.actions;
export default useSetSlice.reducer;
