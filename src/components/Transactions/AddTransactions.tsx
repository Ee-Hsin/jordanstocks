import React from "react"
import { usePostTransactions } from "../../hooks/query"
import { useForm, SubmitHandler } from "react-hook-form"
import { Loader } from "../UI/Loader"
import { SuccessModal } from "../UI/SuccessModal"
import { FailureModal } from "../UI/FailureModal"
import { TransactionType, Currency, Transaction } from "../../types/modelTypes"
import { Timestamp } from "firebase/firestore"

export const AddTransactions: React.FC = () => {
  const { mutate, isError, isSuccess, isLoading, error } = usePostTransactions()

  interface TransactionFormInputs {
    transaction: TransactionType //done
    ticker: string //done
    units: number //done
    currency: Currency //done
    price: number //done
    date: string // This will be converted to Timestamp <-- done
    notes?: string //NOT DONE
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TransactionFormInputs>()

  const handleAddTransaction: SubmitHandler<TransactionFormInputs> = (data) => {
    const transactionData: Transaction = {
      ...data,
      units: Number(data.units),
      price: Number(data.price),
      transaction: Number(data.transaction),
      date: Timestamp.fromDate(new Date(data.date)), // Convert string to Timestamp
    }

    mutate(transactionData)
    reset()
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      {isError && <FailureModal subMessage={error?.message} />}
      {isSuccess && (
        <SuccessModal subMessage="Transaction updated successfully!" />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-12 max-w-lg mx-auto">
          <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto my-5">
            <h1 className="text-indigo-600 text-3xl font-extrabold sm:text-4xl">
              Add Transactions
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(handleAddTransaction)}
            className="space-y-5"
          >
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Date</label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Date is required",
                    maxLength: {
                      value: 50,
                      message: "Company name cannot exceed 50 characters",
                    },
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.date && (
                  <p role="alert" className="text-red-500">
                    {errors.date.message}
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
                      checkNumber: (value) =>
                        typeof value === "number" || "Units must be a number",
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
              <label className="font-medium">Transaction Type</label>
              <select
                {...register("transaction", {
                  required: "Transaction type is required",
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              >
                <option value={TransactionType.BUY}>Buy</option>
                <option value={TransactionType.SELL}>Sell</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Notes</label>
              <input
                type="text"
                {...register("notes")}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.notes && (
                <p role="alert" className="text-red-500">
                  {errors.notes.message}
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
