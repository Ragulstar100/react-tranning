import { createSlice } from '@reduxjs/toolkit';
import { userEmpty } from './userCrossFieldValidation';




export const intialUserState = {
  userName:undefined,
  password:undefined,
  token:false,
  error:{},
  //Contains input Restrictions Messages
  block:{},
};

export let  userFunctions={
  isEmpty:userEmpty
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
    setToken:(state,action)=>{
      state.token=action.payload
    }
    ,
    clearUser: (state) => {
      state.userName = undefined;
      state.password = undefined;
      state.error={}
      state.block={}
    },
    validate:(state,action)=>{
        state.error=action.payload
    },
    restrict:(state,action)=>{
 
        state.block=action.payload
    }

  },
});

export const { setUsername, setPassword, clearUser,validate,restrict,setUser,setToken } = useSetSlice.actions;
export default useSetSlice.reducer;
