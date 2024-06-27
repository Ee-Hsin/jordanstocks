import { AddLetters } from "../components/Letters/AddLetters"
import { LettersDisplay } from "../components/Letters/LettersDisplay"
import { useAuth } from "../hooks/AuthContext"

export const LettersPage: React.FC = () => {
  const { userDetails } = useAuth()

  return (
    <>
      {userDetails?.isAdmin && <AddLetters />}
      <LettersDisplay />
    </>
  )
}
