import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userMainSlice.js';
import userSession from './userSessionSlice.js';
import { userPostProcessMiddleWare, userPreProcessMiddleWare } from './userMiddleware.js';



export function getLoginData(username, password) {
  return new Promise((resolve, reject) => {
    fetch('private/auth.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(loginData => {
        const user = loginData.find(user => user.userName === username&&user.password===password);
        
        if (!user) {
          reject(new Error('Invalid user Name or Password'));
        } else {
          resolve(user);
        }
      })
      .catch(error => {
        // For any fetch or parsing error
        reject(error);
      });
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








