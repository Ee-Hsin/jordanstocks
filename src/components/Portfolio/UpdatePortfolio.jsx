//import { useState } from "react";

import { usePostPortfolio } from "../../hooks/query"
import { useForm } from "react-hook-form"
import { Loader } from "../UI/Loader"
import { SuccessModal } from "../UI/SuccessModal"
import { FailureModal } from "../UI/FailureModal"
import { checkSpecialChars } from "../usefulFunctions/usefulFunctions"

export const UpdatePortfolio = () => {
  const mutation = usePostPortfolio()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const handleUpdatePortfolio = (data, e) => {
    e.preventDefault()

    const value = Math.round(data.units * data.price * data.conversionRate)
    const dataWithValue = { ...data, value: value }

    console.log(dataWithValue)
    mutation.mutate(dataWithValue)

    // Resets the form
    reset()
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      {mutation.isError && <FailureModal subMessage={mutation.error.message} />}
      {mutation.isSuccess && <SuccessModal subMessage="Stock Added!" />}
      {mutation.isLoading ? (
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
                <label className="font-medium">Company</label>
                <input
                  type="text"
                  name="company"
                  {...register("company", {
                    required: true,
                    maxLength: 50,
                    validate: (companyName) => checkSpecialChars(companyName),
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.company?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Company name is required
                  </p>
                )}
                {errors.company?.type === "maxLength" && (
                  <p role="alert" className="text-red-500">
                    Company name cannot exceed 50 characters
                  </p>
                )}
                {errors.company?.type === "validate" && (
                  <p role="alert" className="text-red-500">
                    No special characters are allowed
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium">Ticker</label>
                <input
                  type="text"
                  name="ticker"
                  {...register("ticker", {
                    required: true,
                    setValueAs: (ticker) => ticker.toUpperCase(),
                    maxLength: 10,
                    validate: (ticker) => checkSpecialChars(ticker),
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.ticker?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Ticker is required
                  </p>
                )}
                {errors.ticker?.type === "maxLength" && (
                  <p role="alert" className="text-red-500">
                    Ticker cannot exceed 10 characters
                  </p>
                )}
                {errors.ticker?.type === "validate" && (
                  <p role="alert" className="text-red-500">
                    No special characters are allowed
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Units</label>
                <input
                  type="number"
                  name="units"
                  step="1"
                  {...register("units", {
                    required: true,
                    valueAsNumber: true,
                    min: 1,
                    validate: (units) => Number.isInteger(units),
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.units?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Units is required
                  </p>
                )}
                {errors.units?.type === "min" && (
                  <p role="alert" className="text-red-500">
                    Units must be at least 1.
                  </p>
                )}
                {errors.units?.type === "validate" && (
                  <p role="alert" className="text-red-500">
                    Units must be a whole number
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                    min: 0.01,
                    validate: (price) => typeof price === "number",
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.price?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Price is required
                  </p>
                )}
                {errors.price?.type === "min" && (
                  <p role="alert" className="text-red-500">
                    Minimum price is 0.01
                  </p>
                )}
                {errors.price?.type === "validate" && (
                  <p role="alert" className="text-red-500">
                    Price must be a number
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="font-medium">Currency</label>
              <input
                type="text"
                name="currency"
                {...register("currency", {
                  required: true,
                  setValueAs: (currency) => currency.toUpperCase(),
                  minLength: 3,
                  maxLength: 3,
                  validate: (curr) => checkSpecialChars(curr),
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.currency?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Currency is required
                </p>
              )}
              {(errors.currency?.type === "maxLength" ||
                errors.currency?.type === "minLength") && (
                <p role="alert" className="text-red-500">
                  Currency must be 3 chaacters
                </p>
              )}
              {errors.currency?.type === "validate" && (
                <p role="alert" className="text-red-500">
                  No special characters are allowed
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
                name="conversionRate"
                step="0.000001"
                {...register("conversionRate", {
                  required: true,
                  valueAsNumber: true,
                  validate: (conversionRate) => conversionRate > 0,
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.conversionRate?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Conversion rate is required
                </p>
              )}
              {errors.conversionRate?.type === "validate" && (
                <p role="alert" className="text-red-500">
                  Conversion rate must be a positive number
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
