import { createSlice } from '@reduxjs/toolkit';
import {  userNotValid,userEmpty } from './userCrossFieldValidation';




export const intialUserState = {
  userName:undefined,
  password:undefined,
  error:{},
  //Contains input Restrictions Messages
  block:{},
};

export let  userFunctions={
  isEmpty:userEmpty,
  isNotValid:userNotValid
}

const useSetSlice = createSlice({
  name: 'user',
  initialState:intialUserState,
  reducers: {
    //This used for get userdata from localstorage or session storage
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    setUsername: (state, action) => { 
     state.userName=action.payload 
    },
    setPassword: (state, action) => {
     state.password=action.payload 
     state.block={...state.block,password:action.restrict}
    },
    clearUser: (state) => {
      state.userName = undefined;
      state.password = undefined;
    },
    validate:(state,action)=>{
        state.error=action.payload
    },
    restrict:(state,action)=>{
 
        state.block=action.payload
    }

  },
});

export const { setUsername, setPassword, clearUser,validate,restrict,setUser } = useSetSlice.actions;
export default useSetSlice.reducer;
