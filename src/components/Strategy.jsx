import { StrategyCard } from "./StrategyCard"
import { strategySection } from "../content"

export const Strategy = () => {
  return (
    <div className="h-screen text-center">
      <h1 className="text-3xl">Our Strategy</h1>
      <p className="text-lg">
        We focus on the process in which we aim to achieve superior returns.
      </p>
      <p className="text-lg">
        Focus on the inputs, and the outputs will follow
      </p>
      <div className="flex justify-between m-12 lg:m-36">
        {strategySection.map((strat, index) => {
          return <StrategyCard key={index} {...strat} />
        })}
      </div>
    </div>
  )
}
