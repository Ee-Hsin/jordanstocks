import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom"
import { HomePage } from "./pages/homePage"
import ErrorPage from "./components/Layout/ErrorPage"
import { LettersPage } from "./pages/LettersPage"
import { BlogPage } from "./pages/BlogPage"
import { SignIn } from "./components/Authentication/Signin"
import { NavBar } from "./components/Layout/NavBar"
import { Footer } from "./components/Layout/Footer"
import { SingleBlog } from "./components/Blog/SingleBlog"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ContactPage } from "./pages/ContactPage"

function App() {
  const queryClient = new QueryClient()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="letters" element={<LettersPage />} />
        <Route path="blog">
          <Route index element={<BlogPage />} />
          <Route path=":blogId" element={<SingleBlog />} />
        </Route>
        <Route path="contact" element={<ContactPage />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    )
  )

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
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
