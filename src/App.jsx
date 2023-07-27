import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom"
import { HomePage } from "./pages/homePage"
import ErrorPage from "./components/ErrorPage"
import { LettersPage } from "./pages/LettersPage"
import { BlogPage } from "./pages/BlogPage"
import { Login } from "./components/Login"
import { NavBar } from "./components/NavBar"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="letters" element={<LettersPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

const Layout = () => {
  return (
    <>
      {/* <ResponsiveNavBar /> */}
      <NavBar />
      <Outlet />
      {/* Can put a footer here */}
    </>
  )
}

export default App
