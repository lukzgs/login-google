import { Provider } from "./context/provider"
import { AppRoutes } from "./routes/routes"

export const App = () => {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  )
}