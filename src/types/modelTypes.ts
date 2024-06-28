import { Timestamp } from "firebase/firestore"

// Enum for transaction types, representing them as -1 and 1
export enum TransactionType {
  SELL = -1,
  BUY = 1,
}

const transactionTypeMap: Record<number, TransactionType> = {
  [-1]: TransactionType.SELL,
  [1]: TransactionType.BUY,
}

// Utility function to get TransactionType from number
export function getTransactionType(type: string): TransactionType | undefined {
  const numericType = parseInt(type.trim())
  return transactionTypeMap[numericType]
}

// Enum for supported currencies
export enum Currency {
  USD = "USD",
  SEK = "SEK",
}

export interface Transaction {
  transaction: TransactionType
  ticker: string
  units: number
  currency: Currency
  price: number
  date: Timestamp
  notes?: string
}

export interface BlogPost {
  id: string
  title: string
  content: string[]
  date: string
  description: string
  img: string
}

export interface EmailSubscription {
  email: string
  subscribedAt: Timestamp
}

export interface Letter {
  date: Timestamp
  title: string
  fileURL: string
}

//Needed to create this interface for the usePostLetters because that
//function takes in a file and sends
//out a fileUrl (which matches the type Letter)
export interface ModifiedLetter extends Omit<Letter, "fileURL"> {
  file: File
}

export interface Portfolio {
  stocks: PortfolioStock[]
}

export interface PortfolioStock {
  company: string
  conversionRate: number
  currency: Currency
  price: number
  ticker: string
  units: number
  value: number
}

export interface User {
  email: string
  isAdmin: boolean
  emailVerified: boolean
}

export interface SignInCredentials {
  email: string
  password: string
}
