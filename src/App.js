import Navbar from "./components/navbar/Navbar"
import { Provider } from "./context/provider"
import { AppRoutes } from "./routes/routes"

export const App = () => {
  return (
    <Provider>
      <Navbar />
      <AppRoutes />
    </Provider>
  )
}