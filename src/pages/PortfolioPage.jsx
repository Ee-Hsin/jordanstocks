//import { useState } from "react";

import { PortfolioTable } from "../components/Portfolio/PortfolioTable"
import { UpdatePortfolio } from "../components/Portfolio/UpdatePortfolio"
import { useAuth } from "../hooks/AuthContext"

export const PortfolioPage = () => {
  const { userDetails } = useAuth()

  return (
    <div>
      {userDetails?.isAdmin && <UpdatePortfolio />}
      <PortfolioTable />
    </div>
  )
}
