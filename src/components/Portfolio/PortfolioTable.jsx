import { PORTFOLIO } from "../../content"

const addCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const PortfolioTable = () => {
  let PORTFOLIO_SUM = 0
  PORTFOLIO.forEach((stock) => {
    PORTFOLIO_SUM += stock.value
  })

  const generatedPortfolio = PORTFOLIO.map((stock) => {
    return { ...stock, percent: (stock.value * 100) / PORTFOLIO_SUM }
  })

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-5">
      <div className="max-w-lg">
        <h3 className="text-indigo-600 font-semibold text-xl">Holdings</h3>
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Seraya Portfolio Holdings{" "}
          <small className="text-lg text-indigo-500">
            (Updated June 30th 2023)
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
            {generatedPortfolio.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="px-6 pr-0 py-4 whitespace-nowrap text-left">
                  {item.ticker} - {item.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.units}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${item.price.toFixed(2)}
                  {/* Should be 2 digits already due to form validation 
                  when price is added to database, but this just ensures it */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.currency.toUpperCase()}
                  {/* Should be uppercase already due to form validation when
                  currency is added to database, but this just ensures it*/}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${addCommas(item.value)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.percent.toFixed(2)}%
                </td>
              </tr>
            ))}
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
              <td className="px-6 py-4 whitespace-nowrap">100%</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}
