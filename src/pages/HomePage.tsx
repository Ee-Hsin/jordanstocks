import { Hero } from "../components/Home/Hero"
import { PerformanceTable } from "../components/Home/PerformanceTable"
import { Strategy } from "../components/Home/Strategy/Strategy"

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Strategy />
      <PerformanceTable />
    </div>
  )
}
