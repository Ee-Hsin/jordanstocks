//import { useState } from "react";
import { PerformanceTable } from "../components/PerformanceTable"
import { Strategy } from "../components/Strategy"

export const StrategyPage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Strategy />
      <PerformanceTable />
    </div>
  )
}
