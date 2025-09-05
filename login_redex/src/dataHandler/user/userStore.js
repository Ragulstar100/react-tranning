import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userMainSlice.js';
import userSession from './userSessionSlice.js';
import { userPostProcessMiddleWare, userPreProcessMiddleWare } from './userMiddleware.js';
import * as R from 'ramda'

export const userStore = configureStore({
  reducer: {
    user,
    userSession
  },
  middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(userPreProcessMiddleWare,userPostProcessMiddleWare),
  devTools: process.env.NODE_ENV !== "production",
});

export function getLoginData(username, password) {
  return new Promise((resolve, reject) => {
    try{
    fetch("http://localhost:5000/login/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: username, password }),
    })
      .then((response) => {
    
          return response.json();
        
      })
      .then((res) => {
        if (!res) return; 

        if (res.msg) {
          resolve({ userName:username, password }); 
        } else {
          console.log(res)
          reject(res); 
        }
      })
      .catch((error) => {
        reject( "Server is not available");
      });
    }catch(error){
     
    }
  });
}




//userStore.subscribe(()=>alert("change"))








