//import { useState } from "react";

import { PortfolioTable } from "../components/Portfolio/PortfolioTable"
import { UpdatePortfolio } from "../components/Portfolio/UpdatePortfolio"

export const PortfolioPage = () => {
  return (
    <div>
      <UpdatePortfolio />
      <PortfolioTable />
    </div>
  )
}
