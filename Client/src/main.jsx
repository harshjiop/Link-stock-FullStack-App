import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Home,Login,Signup,Admin} from './pages'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
  },{
    path:'/login',
    element:<Login/>
  },{
    path:'/signup',
    element:<Signup/>
  },{
    path:'/admin',
    element:<Admin/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
