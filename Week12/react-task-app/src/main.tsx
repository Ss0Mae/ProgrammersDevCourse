// import { createRoot } from 'react-dom/client'
// import './index.css'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import store from './store/index'
// import { Provider } from 'react-redux'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <Provider store = {store}>
//     <App />
//   </Provider>
//   ,
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
