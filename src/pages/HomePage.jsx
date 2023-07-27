import { Hero } from "../components/Hero.jsx"
import { PerformanceTable } from "../components/PerformanceTable.jsx"
import { Strategy } from "../components/Strategy.jsx"

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <Strategy />
      <PerformanceTable />
    </div>
  )
}
