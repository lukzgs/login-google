import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { ChooseUsername } from "../pages/username/Username";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/home' element={ <PrivateRoutes /> } >
          <Route path='/home' element={ <Home /> }/>
        </Route>
        <Route path='/username' element={ <PrivateRoutes /> } >
          <Route path='/username' element={ <ChooseUsername /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}