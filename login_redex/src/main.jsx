import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { userStore } from './dataHandler/user/userStore.js'


createRoot(document.getElementById('root')).render(
    <Provider store={userStore}>     
     <App />
    </Provider>  
)
