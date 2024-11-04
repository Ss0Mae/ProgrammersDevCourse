import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from './store/index'
import { Provider } from '../node_modules/react-redux/dist/react-redux'
createRoot(document.getElementById('root')!).render(
  <Provider store = {store}>
    <App />
  </Provider>
  ,
)
