import { useGetLetters } from "../../hooks/query"
import { Loader } from "../UI/Loader"
import { LettersCard } from "./LettersCard"

export const LettersDisplay = () => {
  const { isLoading, isError, isSuccess, data, error } = useGetLetters()

  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          Investment Letters
        </h1>
      </div>
      {isLoading && <Loader />}
      {isError && <h1>Error: {JSON.stringify(error)}</h1>}
      {isSuccess && (
        <ul className="mt-12 space-y-6">
          {data.docs.map((letter, idx) => (
            <LettersCard letter={letter.data()} key={idx} />
          ))}
        </ul>
      )}
    </section>
  )
}
