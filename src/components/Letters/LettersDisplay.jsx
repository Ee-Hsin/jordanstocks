import { letters } from "../../content"
import { LettersCard } from "./LettersCard"

export const LettersDisplay = () => {
  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          Partnership Letters
        </h1>
      </div>
      <ul className="mt-12 space-y-6">
        {letters.map((letter, idx) => (
          <LettersCard letter={letter} key={idx} />
        ))}
      </ul>
    </section>
  )
}
