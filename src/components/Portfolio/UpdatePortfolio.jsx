//import { useState } from "react";

// import { usePostPortfolio } from "../../hooks/query"

export const UpdatePortfolio = () => {
  //   const mutation = usePostPortfolio()

  const handleUpdatePortfolio = (e) => {
    e.preventDefault()

    // Need to check all the forms first

    // Calculate value and put it into object

    //Send the mutation with the object
    // mutation.mutate({})
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="mt-12 max-w-lg mx-auto">
        <form onSubmit={handleUpdatePortfolio} className="space-y-5">
          <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
            <div>
              <label className="font-medium">Company name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Ticker</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
            <div>
              <label className="font-medium">Units</label>
              <input
                type="number"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Price</label>
              <input
                type="number"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="font-medium">Currency</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">
              Conversion rate to USD (if applicable), defaults to 1
            </label>
            <input
              type="number"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
