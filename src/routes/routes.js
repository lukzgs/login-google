import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import { ForgotPassword } from "../pages/forgotPassword/ForgotPassword";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/forgot-password' element={ <ForgotPassword /> } />
        <Route path='/home' element={ <PrivateRoutes /> } >
          <Route path='/home' element={ <Home /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}