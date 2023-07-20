import { NavLink } from "react-router-dom"
import "./LettersNavBar.css"

export const LettersNavBar = () => {
  return (
    <div className="w-full md:w-[300px]">
      <div
        className="flex flex-row md:flex-col justify-center 
      md:h-screen md:absolute md:top-0 md:z-0"
      >
        <NavLink to="/letters" className="m-2 p-2">
          Annual/Interim Letters
        </NavLink>
        <NavLink to="positions" className="m-2 p-2">
          Current Positions
        </NavLink>
      </div>
    </div>
  )
}
