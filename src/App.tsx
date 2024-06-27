import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import ErrorPage from "./components/Layout/ErrorPage"
import { LettersPage } from "./pages/LettersPage"
import { BlogPage } from "./pages/BlogPage"
import { SignIn } from "./components/Authentication/Signin"
import { NavBar } from "./components/Layout/NavBar"
import { Footer } from "./components/Layout/Footer"
import { SingleBlog } from "./components/Blog/SingleBlog"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ContactPage } from "./pages/ContactPage"
import { useAuth } from "./hooks/AuthContext"
import { PortfolioPage } from "./pages/PortfolioPage"
import { FailureModal } from "./components/UI/FailureModal"
import { ForgotPassword } from "./components/Authentication/ForgotPassword"
import { SignUp } from "./components/Authentication/SignUp"
import { TransactionsPage } from "./pages/TransactionsPage"

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
        <Route
          path="portfolio"
          element={
            <ProtectedAuthRoute>
              <PortfolioPage />
            </ProtectedAuthRoute>
          }
        />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
      </Route>
    )
  )

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

const Layout: React.FC = () => {
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

interface ProtectedAuthRouteProps {
  children: React.ReactNode
}

const ProtectedAuthRoute: React.FC<ProtectedAuthRouteProps> = ({
  children,
}) => {
  const { user } = useAuth()

  if (!user) {
    return (
      <FailureModal
        subMessage={"You must sign in to gain access to this page"}
      />
    )
  } else {
    return <>{children}</>
  }
}

export default App
