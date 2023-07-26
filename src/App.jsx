import ResponsiveNavBar from "./components/ResponsiveNavBar"
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
import { StrategyPage } from "./pages/StrategyPage"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="strategy" element={<StrategyPage />} />
        <Route path="letters" element={<LettersPage />}></Route>
        <Route path="blog" element={<BlogPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

const Layout = () => {
  return (
    <>
      <ResponsiveNavBar />
      <Outlet />
      {/* Can put a footer here */}
    </>
  )
}

export default App
