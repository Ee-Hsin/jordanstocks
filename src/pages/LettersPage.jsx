import { AddLetters } from "../components/Letters/AddLetters"
import { LettersDisplay } from "../components/Letters/LettersDisplay"
import { useAuth } from "../hooks/AuthContext"

export const LettersPage = () => {
  const { user } = useAuth()

  return (
    <>
      <LettersDisplay />
      {user && <AddLetters />}
    </>
  )
}
