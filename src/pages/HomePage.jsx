import { Hero } from "../components/Home/Hero.jsx"
import { PerformanceTable } from "../components/Home/PerformanceTable.jsx"
import { Strategy } from "../components/Home/Strategy/Strategy.jsx"

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <Strategy />
      <PerformanceTable />
    </div>
  )
}
