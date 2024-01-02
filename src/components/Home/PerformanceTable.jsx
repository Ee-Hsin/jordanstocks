import { PERFORMANCEFIGURES } from "../../content"

export const PerformanceTable = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-5">
      <div className="max-w-lg">
        <h3 className="text-indigo-600 font-semibold text-xl">Performance</h3>
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Parternship Returns dated 31st December 2023
        </h3>
        <p className="text-gray-600 mt-2">
          {`It has not been long since the fund's inception. In the context of our 3-5 year investment horizons, the results below are not all that meaningful. 
              We hope you take them with a grain of salt.`}
        </p>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 text-left">From:</th>
              <th className="py-3 px-6">Seraya Investment Partnership</th>
              <th className="py-3 px-6">S&P 500 Stock Market Index</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {PERFORMANCEFIGURES.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="px-6 pr-0 py-4 whitespace-nowrap text-left">
                  {item.from}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.serayaPerf}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.sp500Perf}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
