// import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import NotFound from './pages/404';
import { useAuth } from './context/AuthContext';

function App() {
  const auth = useAuth()
  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        {auth?.isLoggedIn && auth.user && <Route path='/chat' element={<Chat/>} />}
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer/>
    </main>
  )
}

export default App
