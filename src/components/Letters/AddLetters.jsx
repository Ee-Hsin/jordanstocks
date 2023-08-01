//import { useState } from "react";

export const AddLetters = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="mt-12 max-w-lg mx-auto">
        <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto my-5">
          <h1 className="text-indigo-600 text-3xl font-extrabold sm:text-4xl">
            Add Letters
          </h1>
        </div>
        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
          <form className="py-5">
            <div className="mb-6">
              <label className="font-medium">Title</label>
              <input
                type="text"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              <label className="font-medium">Date</label>
              <input
                type="date"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              <label className="font-medium">File</label>
              <input
                type="file"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
