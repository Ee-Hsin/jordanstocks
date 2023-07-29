import { StrategyCard } from "./StrategyCard"
import { STRATEGYSECTION } from "../../../content"

export const Strategy = () => {
  return (
    <section className="py-3 md:py-10 mb-5">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-xl space-y-3 mb-5">
          <h3 className="text-indigo-600 font-semibold text-xl">
            Our Strategy
          </h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Three Simple Steps
          </p>
          <p>
            We invest in high quality companies at reasonable prices and hold
            for the long run.
          </p>
        </div>
        <div className="mt-2">
          <ul className="grid gap-x-12 divide-y [&>.feature-1]:pl-0 sm:grid-cols-2 sm:gap-y-8 sm:divide-y-0 lg:divide-x lg:grid-cols-3 lg:gap-x-0">
            {STRATEGYSECTION.map((strat, idx) => (
              <StrategyCard {...strat} idx key={idx} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// <div className={"text-center md:w-[50%]"} id="strategy">
//       <div className="mt-14">
//         <h1
//           className="text-5xl w-[90%] sm:w-[80%]
//         md:w-[50%] m-auto pb-3 border-b-2 l
//         g:pb-0 lg:border-none"
//         >
//           Our Strategy
//         </h1>
//       </div>
//       <div className="flex flex-col lg:justify-between my-8 mx-3 lg:my-12 lg:mx-4">
//         {STRATEGYSECTION.map((strat, index) => {
//           return <StrategyCard key={index} {...strat} />
//         })}
//       </div>
//     </div>
