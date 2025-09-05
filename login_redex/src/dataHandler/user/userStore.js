import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userMainSlice.js';
import userSession from './userSessionSlice.js';
import { userPostProcessMiddleWare, userPreProcessMiddleWare } from './userMiddleware.js';
import { isBlank } from '../../commonModule/ramadaFunctions.js';

export const userStore = configureStore({
  reducer: {
    user,
    userSession
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userPreProcessMiddleWare, userPostProcessMiddleWare),
  devTools: process.env.NODE_ENV !== "production",
});

export function getLoginData(username, password) {
  
  return new Promise((resolve, reject) => {

    const args = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: username, password }),
    };

    const uri = "http://localhost:5000/login/login/";

    try {
      
      fetch(uri, args)
        .then((response) => {
          return response.json();
        })
        .then((res) => {

          if(isBlank(res)) {
            console.error("Server send Empty response Check Login Api "+uri)
            return;
          }
          
          if (!res){
            console.error('something went wrong with logging. invalid response from api');
            return;
          }

          if (res.msg) {
            console.info('user successfully authenticated');
            resolve({ userName: username, password });
          } else {
            console.error(res||"invaild username or password")
            reject(res||"invaild username or password");

          }
        })
        .catch((error) => {
          console.error('something went wrong with logging. invalid response from api', error.message);
          reject("Server is not available");
        });

    } catch (error) {
      console.error('something went wrong with logging. invalid response from api', error.message);
    }
  });
}




//userStore.subscribe(()=>alert("change"))








