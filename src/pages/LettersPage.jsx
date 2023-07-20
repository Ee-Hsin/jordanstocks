import { LettersNavBar } from "../components/LettersNavBar"
import { Outlet } from "react-router-dom"

export const LettersPage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <LettersNavBar />
      <Outlet />
    </div>
  )
}
