import React, { useEffect, useState } from 'react';
import Login from './login';
import { useDispatch, useSelector } from 'react-redux';
import { removeLocalUser, removeSessionUser } from './dataHandler/user/userSessionSlice';
import { intialUserState, setUser } from './dataHandler/user/userMainSlice';


// Main App component that renders the login page
const App = () => {
  const [user, setUser] = useState(intialUserState)
  const dispatch = useDispatch()

  if (user.userName) return <Home user={user} logout={() => {
    dispatch(removeLocalUser())
    dispatch(removeSessionUser())
    dispatch(setUser(intialUserState))
  }} />
  else return <> <Login getUser={(user) => { setUser(user); }} /></>
};


function Home({ user, logout }) {

return<> <div className='home'>
   <label htmlFor=""> {user.userName} </label>
    <button  style={{ height: "35px" }} onClick={() => { logout() }}> Logout </button>
  </div> </>
}


export default App;
