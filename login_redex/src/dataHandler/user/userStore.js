import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userMainSlice.js';
import userSession from './userSessionSlice.js';
import { userPostProcessMiddleWare, userPreProcessMiddleWare } from './userMiddleware.js';
import * as R from 'ramda'


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
        if (!res) return; // exit if response.json() was not returned

        if (res.msg) {
          resolve({ username, password }); // login success
        } else {
          reject("Invalid Username or Password"); // login fail
        }
      })
      .catch((error) => {
        // Network error or server down
        reject( "Server is not available");
      });
    }catch(error){
     
    }
  });
}










export const userStore = configureStore({
  reducer: {
    user,
    userSession
  },
  middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(userPreProcessMiddleWare,userPostProcessMiddleWare),
  devTools: process.env.NODE_ENV !== "production",
});






//userStore.subscribe(()=>alert("change"))








