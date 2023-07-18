//import { useState } from "react";

export const PerformanceTable = () => {
  return (
    <table className="table-auto m-auto text-center my-5">
      <caption className="text-2xl mb-5">
        Parternship Returns dated 30th June 2023
      </caption>
      <thead className="uppercasse bg-green-100">
        <th className=""></th>
        <th className="p-1 md:py-3 md:px-5">Seraya Investment Partnership</th>
        <th className="p-1 md:py-3 md:px-5">S&P 500 Stock Market Index</th>
      </thead>
      <tbody className="bg-white">
        <th className="p-1 md:p-3 py-5">From: December 31st, 2022:</th>
        <td className="">35.70%</td>
        <td className="">16.38%</td>
      </tbody>
      <tbody className="bg-gray-100">
        <th className="p-1 md:p-3 py-5">
          Since inception (September 2nd, 2022)
        </th>
        <td>20.93%</td>
        <td>13.41%</td>
      </tbody>
    </table>
  )
}
