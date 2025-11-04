import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'

import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import { axiosInstance } from './lib/axios.js'
import { useAuthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'
import { useEffect } from 'react'

import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"



const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore();

  useEffect(() => {
    checkAuth()
  },[]);

  console.log("AUTHUSER:", authUser);

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen' >
      <Loader className="size-10 animate-spin"/>

    </div>
  ) 
  

  return (
    <div className='bg-base-200 min-h-screen'  data-theme={theme}>
      <Navbar/>
      
      <Routes>

      <Route path='/' element={ authUser ? <HomePage/> : <Navigate to= "/login" /> } />
      <Route path='/signup' element={ !authUser ? <SignUpPage/> : <Navigate to="/" /> } />
      <Route path='/login' element={ !authUser? <LoginPage/>: <Navigate to= "/"/> } />
      <Route path='/settings' element={<SettingsPage/>} />
      <Route path='/profile' element={ authUser?  <ProfilePage/> : <Navigate to="/login" /> } />

      </Routes>

       <Toaster/>

    </div>
  )
}

export default App