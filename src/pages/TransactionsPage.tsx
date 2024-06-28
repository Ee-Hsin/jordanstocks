import React from "react"
import { TransactionsTable } from "../components/Transactions/TransactionsTable"
import { useAuth } from "../hooks/AuthContext"
import { AddTransactions } from "../components/Transactions/AddTransactions"
import { AddFileTransactions } from "../components/Transactions/AddFileTransactions"

export const TransactionsPage: React.FC = () => {
  const { userDetails } = useAuth()

  return (
    <div>
      {userDetails?.isAdmin && (
        <>
          <AddFileTransactions />
          <AddTransactions />
        </>
      )}
      <TransactionsTable />
    </div>
  )
}
