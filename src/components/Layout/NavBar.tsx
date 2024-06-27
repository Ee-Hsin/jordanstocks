import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useMediaPredicate } from "react-media-hook"

interface NavigationItem {
  title: string;
  path: string;
}

const navigation: NavigationItem[] = [
  { title: "Letters", path: "/letters" },
  { title: "Blog", path: "/blog" },
  { title: "Contact Us", path: "/contact" },
]

export const NavBar: React.FC = () => {
  const [openNav, setOpenNav] = useState<boolean>(false)
  const mediumAndAbove = useMediaPredicate("(min-width: 768px)")
  const location = useLocation()
  const { user, logOut } = useAuth()

  //   We use this to ensure that every time the window is expanded, the hamburger closes and
  // the styles return to full screen mode.
  useEffect(() => {
    if (mediumAndAbove) {
      setOpenNav(false)
    }
  }, [mediumAndAbove])

  //Everytime location changes (meaning a link is clicked), navBar is set to close, and we scroll
  //back up to the top of the page
  useEffect(() => {
    setOpenNav(false)
    scrollToTop()
  }, [location])

  const handleSignOut = async (): Promise<void> => {
    logOut()
      .then(() => {
        // console.log("Logged out")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, left: 0 })
  }

  return (
    <nav className="bg-white border-b w-full md:text-sm md:border-none sticky z-30 top-0">
      <div className={`items-center max-w-screen-xl mx-auto md:flex md:px-8`}>
        <div className="flex items-center justify-between py-3 md:py-5 md:block px-4">
          <Link to="/">
            <div className="flex items-center w-[250px] h-[50px]">
              <h1 className="text-lg md:pt-8">{"Jordan's"} Investment Portfolio</h1>
            </div>
            {/* <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            /> */}
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 pt-3 md:pt-8 w-[100%] bg-white md:block md:pb-0 md:mt-0 ${
            openNav ? "absolute px-3" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-gray-700 hover:text-indigo-600">
                  <Link to={item.path} className="block">
                    {item.title}
                  </Link>
                </li>
              )
            })}
            {user && (
              <li className="text-gray-700 hover:text-indigo-600">
                <Link to={"/portfolio"} className="block">
                  Portfolio
                </Link>
              </li>
            )}
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <li>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="block py-3 px-4 font-medium text-center 
                    text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
                     active:shadow-none rounded-lg shadow md:inline w-full"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="block py-3 px-4 font-medium text-center text-white bg-green-900 hover:bg-green-800 active:bg-green-800 active:shadow-none rounded-lg shadow md:inline"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}
