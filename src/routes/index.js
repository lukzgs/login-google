import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../context/context"

export const PrivateRoutes = () => {
  const { signed } = useContext(Context);
  return signed ? <Outlet /> : <Navigate to='/' />
}