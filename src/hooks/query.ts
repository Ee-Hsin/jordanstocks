import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import {
  getCollection,
  getFirestoreTimestamp,
  postDoc,
  uploadToStorage,
} from "./firestore"
import {
  QuerySnapshot,
  DocumentData,
  DocumentReference,
} from "firebase/firestore"
import { UserCredential } from "firebase/auth"
import { useAuth } from "./AuthContext"
import {
  BlogPost,
  Portfolio,
  PortfolioStock,
  Letter,
  ModifiedLetter,
  SignInCredentials,
  Transaction,
} from "../types/modelTypes"

const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const snapshot: QuerySnapshot<DocumentData> = await getCollection("blogPosts")
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<BlogPost, "id">), // Cast the data of each doc to BlogPost
  }))
}

const useGetBlogPosts = () => {
  return useQuery<BlogPost[], Error>(["blogPosts"], fetchBlogPosts)
}

// Function to fetch and transform portfolio data
const fetchPortfolio = async (): Promise<Portfolio> => {
  const snapshot: QuerySnapshot<DocumentData> = await getCollection(
    "portfolio",
    ["value", "desc"]
  )
  const stocks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as PortfolioStock),
  }))
  return { stocks } as Portfolio // Assuming Portfolio is structured as { stocks: PortfolioStock[] }
}

const useGetPortfolio = () => {
  return useQuery<Portfolio, Error>(["portfolio"], fetchPortfolio)
}

// Function to fetch and transform transaction data
const fetchTransactions = async (skip: number = 0): Promise<Transaction[]> => {
  const snapshot: QuerySnapshot<DocumentData> = await getCollection(
    "transactions",
    ["date", "desc"],
    skip
  )
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))
}

interface UseGetTransactionsOptions {
  skip?: number
}

const useGetTransactions = ({ skip = 0 }: UseGetTransactionsOptions = {}) => {
  return useQuery<Transaction[], Error>(
    ["transactions", skip],
    () => fetchTransactions(skip),
    {
      keepPreviousData: true, // Useful for pagination to keep data during loading new data
      staleTime: 5000, // Adjust based on how frequently your data updates
    }
  )
}

const fetchLetters = async (): Promise<Letter[]> => {
  const snapshot: QuerySnapshot<DocumentData> = await getCollection("letters", [
    "date",
    "asc",
  ])
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Letter, "id">), // Assuming 'Letter' doesn't have 'id' in its interface
  }))
}

const useGetLetters = () => {
  return useQuery<Letter[], Error>(["letters"], fetchLetters)
}

const usePostEmailList = () => {
  return useMutation<void | DocumentReference<DocumentData>, Error, string>(
    (email: string) =>
      postDoc("emailList", {
        subscribedAt: getFirestoreTimestamp(),
        email: email,
      })
  )
}

const usePostLetters = () => {
  const queryClient = useQueryClient()

  return useMutation<
    DocumentReference<DocumentData> | void,
    Error,
    ModifiedLetter
  >(
    async (letter) => {
      // Upload file to storage and get the download URL
      const downloadURL = await uploadToStorage(
        `letters/${letter.title}`,
        letter.file
      )
      const letterData: Letter = {
        title: letter.title,
        date: letter.date,
        fileURL: downloadURL,
      }
      return postDoc("letters", letterData)
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the letters query to update the UI
        queryClient.invalidateQueries(["letters"])
      },
      onError: (error) => {
        console.error("Mutation error:", error)
      },
    }
  )
}

const usePostPortfolio = () => {
  const queryClient = useQueryClient()

  //We call postDoc which is a function that posts a document to the firestore
  //it either uses setDoc or addDoc depending on if the doc already exists
  //setDoc returns Promise<void> and addDoc returns Promise<DocumentReference<DocumentData>>
  //so we can return either of those from the mutation
  return useMutation<
    DocumentReference<DocumentData> | void,
    Error,
    PortfolioStock,
    unknown
  >(
    // Define the mutation function directly as the first argument
    (stock: PortfolioStock) => postDoc("portfolio", stock, stock.ticker),
    {
      // Define the success and error callbacks in the options object
      onSuccess: () => {
        // Invalidate and refetch the portfolio data
        queryClient.invalidateQueries(["portfolio"])
      },
      onError: (error) => {
        // Handle errors here, if necessary
        console.error("Mutation error:", error)
      },
    }
  )
}

const usePostTransactions = () => {
  const queryClient = useQueryClient()

  return useMutation<
    DocumentReference<DocumentData> | void,
    Error,
    Transaction
  >((transaction: Transaction) => postDoc("transactions", transaction), {
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"])
    },
    onError: (error: Error) => {
      console.error("Mutation error:", error)
    },
  })
}

const useSignIn = () => {
  const { signIn } = useAuth()

  return useMutation<UserCredential, Error, SignInCredentials>(
    ({ email, password }) => signIn(email, password),
    {
      onError: (error) => {
        console.error("Login failed:", error)
      },
      onSuccess: (userCredential) => {
        console.log("Login successful:", userCredential)
      },
    }
  )
}

//Creates the user doc on creation
const useCreateUser = () => {
  const { createUser } = useAuth()

  return useMutation<UserCredential, Error, SignInCredentials>({
    mutationFn: ({ email, password }) => createUser(email, password),
    //Think about what info we want to keep on the user doc.
    onSuccess: (cred) =>
      postDoc(
        "users",
        {
          isAdmin: false, //Set isAdmin to false by default on creation, and they can be updated
          //via the firebase console afterward
          email: cred.user.email,
          emailVerified: cred.user.emailVerified,
        },
        cred.user.uid
      ),
  })
}
const useResetPassword = () => {
  const { resetPassword } = useAuth()

  return useMutation<void, Error, string>((email: string) =>
    resetPassword(email)
  )
}

export {
  useGetBlogPosts,
  useGetPortfolio,
  useGetTransactions,
  useGetLetters,
  usePostEmailList,
  usePostLetters,
  usePostPortfolio,
  usePostTransactions,
  useSignIn,
  useCreateUser,
  useResetPassword,
}
