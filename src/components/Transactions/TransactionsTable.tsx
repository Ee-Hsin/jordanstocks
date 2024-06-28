import { useState, useEffect } from "react"
import { useGetTransactions } from "../../hooks/query"
import { FailureModal } from "../UI/FailureModal"
import { Loader } from "../UI/Loader"
import { Transaction, TransactionType, Currency } from "../../types/modelTypes"
import { formatDate } from "../usefulFunctions/usefulFunctions"

// Function to generate display names for each currency
function generateCurrencyDisplayNames(): Record<Currency, string> {
  const entries = Object.entries(Currency).map(([key, value]) => {
    return [value, `${key}`];
  });
  return Object.fromEntries(entries);
}

const CurrencyDisplayNames = generateCurrencyDisplayNames();

interface TransactionWithDisplayData extends Transaction {
  displayCurrency: string;
}

export const TransactionsTable: React.FC = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    data: transactions,
    error,
  } = useGetTransactions()
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

  console.log(formattedTransactions)

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-5">
      <div className="max-w-lg">
        <h3 className="text-indigo-600 font-semibold text-xl">Transactions</h3>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6">Ticker</th>
              <th className="py-3 px-6">Buy/Sell</th>
              <th className="py-3 px-6">Units</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Currency</th>
              <th className="py-3 px-6">Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {isLoading && <Loader />}
            {isError && <FailureModal subMessage={error.message} />}
            {isSuccess &&
              formattedTransactions.map((transaction, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(transaction.date.toDate())}
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.displayCurrency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.notes}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
