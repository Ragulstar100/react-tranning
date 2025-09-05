import React, { useEffect, useState } from 'react';
import Login from './login';
import { useDispatch, useSelector } from 'react-redux';
import { removeLocalUser, removeSessionUser } from './dataHandler/user/userSessionSlice';
import { intialUserState, setToken, setUser } from './dataHandler/user/userMainSlice';
import { Home } from '../home';

const App = () => {
  const dispatch = useDispatch()
 
   const user=useSelector((state)=>state.user)
   const [_user,_setUser]=useState(intialUserState)
   const userSession=useSelector((state)=>state.userSession)


   useEffect(() => {// debug
    if (userSession.user) {
      dispatch(setUser(userSession.user));
      dispatch(setToken(true));
    }
  
    if (userSession.sessionUser) {
      dispatch(setUser(userSession.sessionUser));
      dispatch(setToken(true));
    }
  }, [userSession,user.token]);


  if (user.token) return <Home user={user} logout={() => {
    dispatch(removeLocalUser())
    dispatch(removeSessionUser())
    dispatch(setToken(false))
  }} />
  else return <> <Login /></>
};





export default App;
