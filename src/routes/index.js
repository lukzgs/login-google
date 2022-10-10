import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../context/context"

export const PrivateRoutes = () => {
  const { user } = useContext(Context);
  return user ? <Outlet /> : <Navigate to='/' />
}