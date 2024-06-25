//import { useState } from "react";

import { usePostPortfolio } from "../../hooks/query"
import { useForm, SubmitHandler } from "react-hook-form"
import { Loader } from "../UI/Loader"
import { SuccessModal } from "../UI/SuccessModal"
import { FailureModal } from "../UI/FailureModal"
import { checkSpecialChars } from "../usefulFunctions/usefulFunctions"
import { PortfolioStock, Currency } from "../../types/modelTypes"

export const UpdatePortfolio = () => {
  const { mutate, isError, isSuccess, isLoading, error } = usePostPortfolio()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PortfolioStock>()

  const handleUpdatePortfolio: SubmitHandler<PortfolioStock> = (
    data: Omit<PortfolioStock, "value">
  ) => {
    // Assuming value needs to be calculated
    const value = Math.round(data.units * data.price * data.conversionRate)
    const updatedData: PortfolioStock = { ...data, value } // Update the data with the calculated value

    mutate(updatedData)
    reset()
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      {isError && <FailureModal subMessage={error.message} />}
      {isSuccess && <SuccessModal subMessage="Stock Added!" />}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-12 max-w-lg mx-auto">
          <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto my-5">
            <h1 className="text-indigo-600 text-3xl font-extrabold sm:text-4xl">
              Add Stocks
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdatePortfolio)}
            className="space-y-5"
          >
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                {/* Company Input */}
                <label className="font-medium">Company</label>
                <input
                  type="text"
                  {...register("company", {
                    required: "Company name is required",
                    maxLength: {
                      value: 50,
                      message: "Company name cannot exceed 50 characters",
                    },
                    validate: {
                      checkSpecialChars: (value) =>
                        checkSpecialChars(value) ||
                        "No special characters are allowed",
                    },
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.company && (
                  <p role="alert" className="text-red-500">
                    {errors.company.message}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium">
                  Ticker{" "}
                  <span className="text-xs">
                    (if already exists, overrides ticker)
                  </span>
                </label>
                <input
                  type="text"
                  {...register("ticker", {
                    required: "Ticker is required",
                    setValueAs: (ticker) => ticker.toUpperCase(),
                    maxLength: {
                      value: 10,
                      message: "Ticker cannot exceed 10 characters",
                    },
                    validate: {
                      checkSpecialChars: (value) =>
                        checkSpecialChars(value) ||
                        "No special characters are allowed",
                    },
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.ticker && (
                  <p role="alert" className="text-red-500">
                    {errors.ticker.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Units</label>
                <input
                  type="number"
                  step="1"
                  {...register("units", {
                    required: "Units is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Units must be at least 1",
                    },
                    validate: {
                      checkInteger: (value) =>
                        Number.isInteger(value) ||
                        "Units must be a whole number",
                    },
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.units && (
                  <p role="alert" className="text-red-500">
                    {errors.units.message}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium">Price</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: {
                      value: 0.01,
                      message: "Minimum price is 0.01",
                    },
                    validate: {
                      checkNumber: (value) =>
                        typeof value === "number" || "Price must be a number",
                    },
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.price && (
                  <p role="alert" className="text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="font-medium">Currency</label>
              <select
                {...register("currency", { required: "Currency is required" })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              >
                {Object.values(Currency).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              {errors.currency && (
                <p role="alert" className="text-red-500">
                  {errors.currency.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">
                Conversion rate to USD (if applicable). Put 1 if Currency is
                USD.
              </label>
              <input
                type="number"
                step="0.000001"
                {...register("conversionRate", {
                  required: "Conversion rate is required",
                  valueAsNumber: true,
                  validate: {
                    checkPositiveNumber: (value) =>
                      value > 0 || "Conversion rate must be a positive number",
                  },
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.conversionRate && (
                <p role="alert" className="text-red-500">
                  {errors.conversionRate.message}
                </p>
              )}
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
