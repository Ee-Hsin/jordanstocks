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
import { SignIn } from "./components/Signin"
import { NavBar } from "./components/NavBar"
import { Footer } from "./components/Footer"
import { Blog } from "./components/Blog"
import { AuthContextProvider } from "./hooks/AuthContext"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="letters" element={<LettersPage />} />
        <Route path="blog">
          <Route index element={<BlogPage />} />
          <Route path=":blogId" element={<Blog />} />
        </Route>
        <Route path="contact" element={<h1>Contact Us Page</h1>} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    )
  )

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

const Layout = () => {
  return (
    <>
      {/* <ResponsiveNavBar /> */}
      <NavBar />
      <Outlet />
      <Footer />
      {/* Can put a footer here */}
    </>
  )
}

export default App
