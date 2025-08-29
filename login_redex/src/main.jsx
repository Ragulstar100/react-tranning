import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { userStore } from './dataHandler/user/userStore.js'
import { validateStore } from './dataHandler/validate/validateStore.js'


createRoot(document.getElementById('root')).render(

    <Provider store={validateStore}>
    <Provider store={userStore}>     
     <App />
    </Provider>
    </Provider>   
)
