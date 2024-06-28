import React, { useState } from "react"
import { usePostTransactions } from "../../hooks/query"
import Papa from "papaparse"
import {
  Transaction,
  getTransactionType,
  Currency,
} from "../../types/modelTypes"
import { SuccessModal } from "../UI/SuccessModal"
import { Timestamp } from "firebase/firestore"

interface CSVTransaction extends Omit<Transaction, "date" | "transaction" | "units" | "price" > {
  date: string // Date in string format which will be converted later
  transaction: string // This should be string because CSV values are strings
  units: string // This should be string because CSV values are strings
  price: string // This should be string because CSV values are strings
}

//Concerns:
//loader for when loading
//error handling for if the columns don't match up

export const AddFileTransactions: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)
  const { mutate } = usePostTransactions()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null)
  }

  const validateTransactions = (transactions: CSVTransaction[]) => {
    const errors: string[] = []
    const validTransactions: Transaction[] = []

    transactions.forEach((transaction, index) => {
      const {
        transaction: type,
        ticker,
        units,
        currency,
        price,
        date,
        notes,
      } = transaction

      // Validate transaction type
      const transactionType = getTransactionType(type)
      if (!transactionType) {
        errors.push(`Row ${index + 1}: Invalid transaction type.`)
      }

      // Validate ticker
      if (!ticker || typeof ticker !== "string" || ticker.length > 10) {
        errors.push(
          `Row ${
            index + 1
          }: Ticker must be a string with less than or equal to 10 characters.`
        )
      }

      let parsedUnits = parseFloat(units)
      if (!units || isNaN(parsedUnits) || parsedUnits <= 0) {
        console.log(parsedUnits, units, isNaN(parsedUnits))
        errors.push(`Row ${index + 2}: Units must be a number greater than 0.`)
      } else {
        parsedUnits = parseFloat(parsedUnits.toFixed(2)) // Limit to 2 decimal places
      }

      // Validate currency
      if (!Object.values(Currency).includes(currency)) {
        errors.push(`Row ${index + 1}: Invalid currency.`)
      }

      // Validate price
      let parsedPrice = parseFloat(price)
      if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
        errors.push(`Row ${index + 1}: Price must be a number greater than 0.`)
      } else {
        parsedPrice = parseFloat(parsedPrice.toFixed(2)) // Limit to 2 decimal places
      }

      // Validate date and format
      const parsedDate = new Date(date)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(parsedDate.getTime())) {
        errors.push(
          `Row ${index + 1}: Date must be in YYYY-MM-DD format and valid.`
        )
      }

      // If no errors, add to valid transactions
      if (errors.length === 0 && transactionType) {
        //ensures that transactionType is not undefined
        validTransactions.push({
          transaction: transactionType,
          ticker,
          units: parsedUnits,
          currency,
          price: parsedPrice,
          date: Timestamp.fromDate(parsedDate), // Convert parsedDate (Date object) to Timestamp
          notes: notes || "",
        })
      }
    })

    if (errors.length > 0) {
      setErrors(errors)
      setSuccess(false)
    } else {
      //If not, then mutate the valid transactions
      validTransactions.forEach((transaction) => mutate(transaction))
      setSuccess(true)
    }
  }

  const expectedColumns = [
    "transaction",
    "ticker",
    "units",
    "currency",
    "price",
    "date",
    "notes",
  ] // Define expected columns

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) {
      setErrors(["No file selected."])
      return
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as CSVTransaction[]
        if (data.length > 0) {
          // Check if all expected columns are present
          const actualColumns = Object.keys(data[0])
          const missingColumns = expectedColumns.filter(
            (column) => !actualColumns.includes(column)
          )

          if (missingColumns.length > 0) {
            setErrors([`Missing columns: ${missingColumns.join(", ")}.`])
            return
          }

          validateTransactions(data)
        } else {
          setErrors(["CSV is empty or columns are improperly formatted."])
        }
      },
      error: (error) => {
        setErrors([error.message])
      },
    })
  }

  return (
    <div className="mt-12 max-w-lg mx-auto">
      <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto my-5">
        <h1 className="text-indigo-600 text-3xl font-extrabold sm:text-4xl">
          Add Transactions
          <br></br>(via CSV File)
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center justify-center  gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
          <input type="file" accept=".csv" onChange={handleFileChange} />
          {errors.length > 0 && (
            <div className="flex flex-row">
              <h3 className="text-red-500">Errors:</h3>
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Submit
        </button>
      </form>
      {success && (
        <SuccessModal subMessage="All transactions have been successfully uploaded and validated." />
      )}
    </div>
  )
}
