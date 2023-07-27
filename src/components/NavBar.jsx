import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useMediaPredicate } from "react-media-hook"

const navigation = [
  { title: "Letters", path: "/letters" },
  { title: "Blog", path: "/blog" },
  { title: "Contact Us", path: "/contact" },
]

export const NavBar = () => {
  const [openNav, setOpenNav] = useState(false)
  const [loggedIn, setLoggedIn] = useState()

  const mediumAndAbove = useMediaPredicate("(min-width: 768px)")

  //   We use this to ensure that every time the window is expanded, the hamburger closes and
  // the styles return to full screen mode.
  useEffect(() => {
    if (mediumAndAbove) {
      setOpenNav(false)
    }
  }, [mediumAndAbove])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        // console.log(1)
      } else {
        setLoggedIn(false)
        // console.log(2)
      }
    })

    return () => unsubscribe()
  }, [loggedIn])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <nav className="bg-white border-b w-full md:text-sm md:border-none sticky top-0">
      <div className={`items-center max-w-screen-xl mx-auto md:flex md:px-8`}>
        <div className="flex items-center justify-between py-3 md:py-5 md:block px-4">
          <Link to="/">
            <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            />
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
          className={`flex-1 pb-3 pt-8 w-[100%] bg-white md:block md:pb-0 md:mt-0 ${
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
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <li>
                {loggedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 text-sm text-white 
                    duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 
                    active:shadow-lg"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
                  >
                    Partner Sign In
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
