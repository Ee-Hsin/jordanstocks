//import { useState } from "react";

// import { usePostPortfolio } from "../../hooks/query"
import { useForm } from "react-hook-form"

export const UpdatePortfolio = () => {
  //   const mutation = usePostPortfolio()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const handleUpdatePortfolio = (data, e) => {
    e.preventDefault()

    // Add callback functions with validate in the respective react hook checks
    // Units must be an integer
    // Price must have 2 decimal places
    // Currency must be all CAPS

    // Calculate the total value and round to nearest integer
    const value = Math.round(data.units * data.price * data.conversionRate)
    const dataWithValue = { ...data, value: value }
    // mutation.mutate(dataWithValue)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="mt-12 max-w-lg mx-auto">
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
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.company?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Company name is required
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Ticker</label>
              <input
                type="text"
                name="ticker"
                {...register("ticker", { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.ticker?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Ticker is required
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
            <div>
              <label className="font-medium">Units</label>
              {/* TODO: Add callback function to ensure this is an Integer */}
              <input
                type="number"
                name="units"
                {...register("units", { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.units?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Units is required
                </p>
              )}
            </div>
            <div>
              <label className="font-medium">Price</label>
              {/* TODO: Add callback function to ensure this is not more than 2 decimal places */}
              <input
                type="number"
                name="price"
                {...register("price", { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.price?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Price is required
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
                minLength: 3,
                maxLength: 3,
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
          </div>
          <div>
            <label className="font-medium">
              Conversion rate to USD (if applicable), defaults to 1
            </label>
            <input
              type="number"
              name="conversionRate"
              defaultValue={1}
              {...register("conversionRate", { required: true })}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.conversionRate?.type === "required" && (
              <p role="alert" className="text-red-500">
                Conversion rate is required
              </p>
            )}
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
