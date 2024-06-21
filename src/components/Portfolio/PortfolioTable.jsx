// import { PORTFOLIO } from "../../content"
import { useGetPortfolio } from "../../hooks/query"
import { FailureModal } from "../UI/FailureModal"
import { Loader } from "../UI/Loader"
import { addCommas } from "../usefulFunctions/usefulFunctions"

export const PortfolioTable = () => {
  const { isLoading, isError, isSuccess, data, error } = useGetPortfolio()

  // TODO: Eventually move these into state
  let PORTFOLIO_SUM = 0
  let generatedPortfolio = []

  if (isSuccess) {
    data.forEach((stock) => {
      const stockData = stock.data()
      PORTFOLIO_SUM += stockData.value
    })

    generatedPortfolio = data.docs.map((stock) => {
      return {
        ...stock.data(),
        percent: (stock.data().value * 100) / PORTFOLIO_SUM,
      }
    })
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-5">
      <div className="max-w-lg">
        <h3 className="text-indigo-600 font-semibold text-xl">Holdings</h3>
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Burung Portfolio Holdings{" "}
          <small className="text-lg text-indigo-500">
            (Updated December 31st 2023)
          </small>
        </h3>
        <p className="text-gray-600 mt-2">
          {`Units held, prices, and exchange rates are based on information accurate 
          only to 30th June 2023`}
        </p>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6">Units</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Currency</th>
              <th className="py-3 px-6">Value (USD)</th>
              <th className="py-3 px-6">% of Portfolio</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {isLoading && (
              <tr className="text-center">
                {/* Creates an array of length 6 to generate 6 of those Loaders */}
                {Array.from({ length: 6 }, (x, i) => i).map((a, index) => (
                  <td className="px-6 py-4 whitespace-nowrap" key={index}>
                    <Loader small />
                  </td>
                ))}
              </tr>
            )}
            {isSuccess &&
              generatedPortfolio.map((stock, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-6 pr-0 py-4 whitespace-nowrap text-left">
                    {idx + 1 + ". "} {stock.ticker} - {stock.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{stock.units}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${stock.price.toFixed(2)}
                    {/* May not be 2 digits as form validation may not upload with 2 digits
                  when price is added to database, but this just ensures it */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {stock.currency.toUpperCase()}
                    {/* Should be uppercase already due to form validation when
                  currency is added to database, but this just ensures it*/}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${addCommas(stock.value)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {stock.percent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            {isError && <FailureModal subMessage={error.message} />}
          </tbody>
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr className="text-center">
              <td className="px-6 py-4 whitespace-nowrap text-left">
                Assets Under Management
              </td>
              <td className="px-6 py-4 whitespace-nowrap">-</td>
              <td className="px-6 py-4 whitespace-nowrap">-</td>
              <td className="px-6 py-4 whitespace-nowrap">-</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${addCommas(PORTFOLIO_SUM)}
              </td>
              {isSuccess && (
                <td className="px-6 py-4 whitespace-nowrap">100%</td>
              )}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}
