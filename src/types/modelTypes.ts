import { Timestamp } from "firebase/firestore";

// Enum for transaction types, representing them as -1 and 1
export enum TransactionType {
    SELL = -1,
    BUY = 1
  }
  
  // Enum for supported currencies
  export enum Currency {
    USD = "USD",
    SEK = "SEK"
  }
  
export interface Transaction {
    transaction: TransactionType; //todo: I will make it into an enum of -1 and 1
    symbol: string;
    units: number;
    currency: Currency; //fixed enums of USD and SEK
    price: number;
    date: Timestamp;
    notes?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    content: [string];
    date: string;
    description: string;
    img: string;
}

export interface EmailSubscription {
    email: string;
    subscribedAt: Timestamp;
}

export interface Letter {
    date: Timestamp;
    title: string;
    fileURL: string;
}

//Needed to create this interface for the usePostLetters because that
//function takes in a file and sends
//out a fileUrl (which matches the type Letter)
export interface ModifiedLetter extends Omit<Letter, 'fileURL'> {
    file: File;
  }

export interface Portfolio {
    stocks: PortfolioStock[];
}

export interface PortfolioStock {
    company: string;
    conversionRate: number;
    currency: Currency;
    price: number;
    ticker: string;
    units: number;
    value: number;
}

export interface User {
    email: string;
    isAdmin: boolean;
    emailVerified: boolean;
}

