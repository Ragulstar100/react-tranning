import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userMainSlice.js';
import userSession from './userSessionSlice.js';
import { userPostProcessMiddleWare, userPreProcessMiddleWare } from './userMiddleware.js';
import * as R from 'ramda'



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

const trackActionMiddleware = storeAPI => next => action => {
  const prevState = storeAPI.getState();      // state before action
  const result = next(action);                // dispatch action
  const nextState = storeAPI.getState(); 
 
 
  const changedSlices = R.keys(  R.pickBy((val, key) => !R.equals(val, prevState[key]), nextState));
  console.log(changedSlices); // ['user']

  return result
};




export const userStore = configureStore({
  reducer: {
    user,
    userSession
  },
  middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(userPreProcessMiddleWare,userPostProcessMiddleWare,trackActionMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});






//userStore.subscribe(()=>alert("change"))








