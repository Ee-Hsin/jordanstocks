import { useState, useEffect, createElement } from "react"
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react"
import {
  ChevronDownIcon,
  ChartBarSquareIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline"

const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
}

const navListMenuItems = [
  {
    color: "blue",
    icon: FlagIcon,
    title: "Values",
    description: "We run our fund with a set of Core Values",
  },
  {
    color: "orange",
    icon: FolderIcon,
    title: "Strategy",
    description: "How we seek to achieve outperformance",
  },
  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Letters to Partners",
    description: "Annual and Interim Letters",
  },
  {
    color: "green",
    icon: UsersIcon,
    title: "Holdings",
    description: "Our Holdings List",
  },
]

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-serif"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-serif">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  )

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="small"
            className="font-serif font-medium text-md"
          >
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Investment Philosophy
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  )
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-serif font-medium text-md"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <ChartBarSquareIcon className="h-[18px] w-[18px]" />
          Performance
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-serif font-medium text-md"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <BookOpenIcon className="h-[18px] w-[18px]" />
          Blog
        </ListItem>
      </Typography>
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
      <div className="flex items-center justify-between text-blue-gray-900">
        <a href="#hero">
          <h1>Seraya Investment Partnership </h1>
        </a>
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
