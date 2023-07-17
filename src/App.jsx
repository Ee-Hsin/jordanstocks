import ResponsiveNavBar from "./components/ResponsiveNavBar"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom"
import { HomePage } from "./pages/homePage"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

const Root = () => {
  return (
    <>
      <ResponsiveNavBar />
      <Outlet />
    </>
  )
}

export default App
