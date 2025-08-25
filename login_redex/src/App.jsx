import React, { useEffect, useState } from 'react';
import Login from './login';
import { useDispatch, useSelector } from 'react-redux';
import { removeLocalUser, removeSessionUser } from './redex/user/userSessionSlice';
import { initialState, setUser } from './redex/user/userSetSlice';

// Main App component that renders the login page
const App = () => {
  const [user, setUser] = useState(initialState)
  const userSession = useSelector((state) => state.userSession)
  const dispatch = useDispatch()

  if (user.userName) return <Home user={user} logout={() => {
    dispatch(removeLocalUser())
    dispatch(removeSessionUser())
    dispatch(setUser(initialState))
    setUser(initialState)
  }} />
  else return <> <Login getUser={(user) => { setUser(user); }} /></>

};


function Home({ user, logout }) {


  return <div style={{ display: "flex", width: '100vw', height: '100%', padding: '20px', justifyContent: 'space-between' }}>
    {user.userName}
    <button type='submit' style={{ height: "20px" }} onClick={() => {
      logout()
    }}>
      Logout
    </button>
  </div>
}


export default App;
