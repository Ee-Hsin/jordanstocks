import { useState, useEffect } from "react"
import { useGetTransactions } from "../../hooks/query"
import { FailureModal } from "../UI/FailureModal"
import { Loader } from "../UI/Loader"
import { Transaction, TransactionType, Currency } from "../../types/modelTypes"
import { formatDate } from "../usefulFunctions/usefulFunctions"
import { useAuth } from "../../hooks/AuthContext"
import { Link } from "react-router-dom"
import { TRANSACTION_SKIPS } from "../../content"

// Function to generate display names for each currency
function generateCurrencyDisplayNames(): Record<Currency, string> {
  const entries = Object.entries(Currency).map(([key, value]) => {
    return [value, `${key}`]
  })
  return Object.fromEntries(entries)
}

const CurrencyDisplayNames = generateCurrencyDisplayNames()

interface TransactionWithDisplayData extends Transaction {
  displayCurrency: string
}

export const TransactionsTable: React.FC = () => {
  const { user } = useAuth()

  const {
    isLoading,
    isError,
    isSuccess,
    data: transactions,
    error,
  } = useGetTransactions({ skip: user ? 0 : TRANSACTION_SKIPS })
  const [formattedTransactions, setFormattedTransactions] = useState<
    TransactionWithDisplayData[]
  >([])

  useEffect(() => {
    if (isSuccess && transactions) {
      const formattedData = transactions.map((transaction) => ({
        ...transaction,
        displayCurrency: CurrencyDisplayNames[transaction.currency],
      }))
      setFormattedTransactions(formattedData)
    }
  }, [transactions, isSuccess])

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-5">
      <div className="max-w-lg">
        <h3 className="text-indigo-600 font-semibold text-xl">Transactions</h3>
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Latest Transactions{" "}
          <small className="text-lg text-indigo-500">
            (Updated Till Latest Transaction)
          </small>
        </h3>
        <p className="text-gray-600 mt-2">
          {`Transactions are updated till the latest transaction. However, you must sign in to view the 5 most recent
          transactions`}
        </p>{" "}
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-3">
                Date <a className="text-xs">(YYYY-MM-DD)</a>
              </th>
              <th className="py-3 px-6">Currency</th>
              <th className="py-3 px-6">Ticker</th>
              <th className="py-3 px-6">Buy/Sell</th>
              <th className="py-3 px-6">Units</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {isLoading && <Loader />}
            {isError && <FailureModal subMessage={error.message} />}
            {isSuccess &&
              !user &&
              Array.from({ length: TRANSACTION_SKIPS }).map((_, idx) => (
                <tr key={idx} className="text-center">
                  {/* We add the sign in modal on the middle row */}
                  {idx === Math.floor(TRANSACTION_SKIPS / 2) ? (
                    <td colSpan={7} className="relative px-3 py-4">
                      <Link
                        to="/signIn"
                        className="text-sm bg-green-900 hover:bg-green-800 bg-opacity-90 py-1 px-3 rounded-lg text-white"
                      >
                        Sign in to view latest transactions
                      </Link>
                    </td>
                  ) : (
                    <>
                      <td className="px-3 py-4 blur-sm text-opacity-20 select-none pointer-events-none whitespace-nowrap">
                        --/--/----
                      </td>
                      <td className="px-6 py-4 blur-sm text-opacity-20 select-none pointer-events-none whitespace-nowrap">
                        XXXXXX
                      </td>
                      <td className="px-6 py-4 blur-sm text-opacity-20 select-none pointer-events-none whitespace-nowrap">
                        XXXX
                      </td>
                      <td className="px-6 py-4 blur-sm text-opacity-20 select-none pointer-events-none whitespace-nowrap">
                        XXX
                      </td>
                      <td className="px-6 py-4 blur-sm text-opacity-20 select-none pointer-events-none whitespace-nowrap">
                        $XX.XX
                      </td>
                      <td className="px-6 py-4 blur-sm text-opacity-20 select-none pointer-events-none whitespace-nowrap">
                        XXX
                      </td>
                      <td className="px-6 py-4 blur-sm text-opacity-20 select-none pointer-events-none whitespace-nowrap">
                        XXXXXXXXXXXXX
                      </td>
                    </>
                  )}
                </tr>
              ))}
            {isSuccess &&
              formattedTransactions.map((transaction, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-3 py-4 whitespace-nowrap">
                    {formatDate(transaction.date.toDate())}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.displayCurrency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.ticker}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.transaction === TransactionType.BUY
                      ? "Buy"
                      : "Sell"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.units}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${transaction.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap max-w-xs">
                    {transaction.notes ? transaction.notes : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
