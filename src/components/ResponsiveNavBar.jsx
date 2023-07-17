import { useState, useEffect } from "react"
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react"
import {
  GlobeAsiaAustraliaIcon,
  ChartBarSquareIcon,
  Bars3Icon,
  XMarkIcon,
  FolderIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <a
        href="#strategy"
        className="text-blue-gray-900 font-serif font-medium text-md"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <GlobeAsiaAustraliaIcon className="h-[18px] w-[18px]" />
          Strategy
        </ListItem>
      </a>

      <Link
        to="/performance"
        className="text-blue-gray-900 font-serif font-medium text-md"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <ChartBarSquareIcon className="h-[18px] w-[18px]" />
          Performance
        </ListItem>
      </Link>
      <Link
        to="/letters"
        className="text-blue-gray-900 font-serif font-medium text-md"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <FolderIcon className="h-[18px] w-[18px]" />
          Letters
        </ListItem>
      </Link>
      <Link
        to="/blog"
        className="text-blue-gray-900 font-serif font-medium text-md"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <BookOpenIcon className="h-[18px] w-[18px]" />
          Blog
        </ListItem>
      </Link>
    </List>
  )
}

export default function ResponsiveNavBar() {
  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    const resizeHandler = () => {
      return window.innerWidth >= 960 && setOpenNav(false)
    }
    window.addEventListener("resize", resizeHandler)

    // I added this to clean up the addded window event listener but it might not be neccesary
    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-3 sticky top-0 rounded-none min-w-full">
      <div className="flex items-center justify-between text-blue-gray-900 scroll-smooth">
        <Link href="/" className="scroll-smooth">
          <h1>Seraya Investment Partnership </h1>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button
            variant="text"
            size="sm"
            color="blue-gray"
            className="font-serif"
          >
            Partner Login
          </Button>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Sign In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign Up
          </Button>
        </div>
      </Collapse>
    </Navbar>
  )
}
