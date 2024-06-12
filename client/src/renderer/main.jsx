import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD:client/src/main.jsx
import './index.css'
import { Provider } from 'react-redux';
import store from '../src/redux/store.js';
=======
import '../index.css'
>>>>>>> e112ad3e3ff8fae5f4cfc2ab4aa8cb56c091b890:client/src/renderer/main.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
