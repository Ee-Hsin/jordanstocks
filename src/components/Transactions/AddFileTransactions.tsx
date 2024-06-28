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

interface CSVTransaction extends Omit<Transaction, "date" | "transaction"> {
  date: string // Date in string format which will be converted later
  transaction: string; // This should be string because CSV values are strings
}

//Concerns:
//loader for when loading
//error handling for if the columns don't match up

const AddFileTransactions: React.FC = () => {
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

      // Validate units
      let parsedUnits = parseFloat(units.toString())
      if (!units || isNaN(parsedUnits) || parsedUnits <= 0) {
        errors.push(`Row ${index + 1}: Units must be a number greater than 0.`)
      } else {
        parsedUnits = parseFloat(parsedUnits.toFixed(2)) // Limit to 2 decimal places
      }

      // Validate currency
      if (!Object.values(Currency).includes(currency)) {
        errors.push(`Row ${index + 1}: Invalid currency.`)
      }

      // Validate price
      let parsedPrice = parseFloat(price.toString())
      if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
        errors.push(`Row ${index + 1}: Price must be a number greater than 0.`)
      } else {
        parsedPrice = parseFloat(parsedPrice.toFixed(2)) // Limit to 2 decimal places
      }

      // Validate date
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        errors.push(`Row ${index + 1}: Date must be in YYYY-MM-DD format.`)
      }

      // If no errors, add to valid transactions
      if (errors.length === 0 && transactionType) { //ensures that transactionType is not undefined
        validTransactions.push({
          transaction: transactionType,
          ticker,
          units: parsedUnits,
          currency,
          price: parsedPrice,
          date: Timestamp.fromDate(new Date(date)), // Convert string to Timestamp
          notes: notes || "",
        })
      }
    })

    if (errors.length > 0) {
      setErrors(errors)
      setSuccess(false)
    } else { //If not, then mutate the valid transactions
      validTransactions.forEach((transaction) => mutate(transaction))
      setSuccess(true)
    }
  }

  const expectedColumns = ['transaction', 'ticker', 'units', 'currency', 'price', 'date', 'notes']; // Define expected columns

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
        const data = results.data as CSVTransaction[];
        if (data.length > 0) {
          // Check if all expected columns are present
          const actualColumns = Object.keys(data[0]);
          const missingColumns = expectedColumns.filter(column => !actualColumns.includes(column));
  
          if (missingColumns.length > 0) {
            setErrors([`Missing columns: ${missingColumns.join(', ')}.`]);
            return;
          }
  
          validateTransactions(data);
        } else {
          setErrors(["CSV is empty or columns are improperly formatted."]);
        }
      },
      error: (error) => {
        setErrors([error.message])
      },
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload and Validate Transactions</button>
      </form>
      {errors.length > 0 && (
        <div>
          <h3>Errors:</h3>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {success && (
        <SuccessModal subMessage="All transactions have been successfully uploaded and validated." />
      )}
    </div>
  )
}

export default AddFileTransactions
