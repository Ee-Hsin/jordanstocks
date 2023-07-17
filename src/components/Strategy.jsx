import { StrategyCard } from "./StrategyCard"
import { strategySection } from "../content"

export const Strategy = () => {
  return (
    <div className="h-screen text-center" id="strategy">
      <div className="mt-14">
        <h1 className="text-5xl">Our Strategy</h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between my-8 mx-3 lg:my-12 lg:mx-4">
        {strategySection.map((strat, index) => {
          return <StrategyCard key={index} {...strat} />
        })}
      </div>
    </div>
  )
}
