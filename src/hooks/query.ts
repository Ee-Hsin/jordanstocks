import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import {
  getCollection,
  getFirestoreTimestamp,
  postDoc,
  uploadToStorage,
} from "./firestore"
import { useAuth } from "./AuthContext"
import { BlogPost, Portfolio, PortfolioStock } from "../types/modelTypes"
import {
  QuerySnapshot,
  DocumentData,
  DocumentReference,
} from "firebase/firestore"

// Assuming getCollection is defined somewhere and you import it
// Adjust this function or create a new one that converts QuerySnapshot to BlogPost[]
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

const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getCollection("transactions", ["date", "desc"]),
  })
}

const useGetLetters = () => {
  return useQuery({
    queryKey: ["letters"],
    queryFn: () => getCollection("letters", ["date", "desc"]),
  })
}

const usePostEmailList = () => {
  return useMutation({
    mutationFn: (email) =>
      postDoc("emailList", {
        subscribedAt: getFirestoreTimestamp(),
        email: email,
      }),
  })
}

const usePostLetters = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (letter) => {
      //Must call a function to upload letter to firestore, which returns the downloadURL

      // Will need to wait for the storage return...
      const downloadURL = await uploadToStorage(
        `letters/${letter.title}`,
        letter.file
      )

      // // We remove the file (don't upload that to fireStore)
      // delete letter.file
      // // So we are uploading Title and Date, the fileURL will be added from the backend!
      // return postDoc("letters", letter)

      delete letter.file
      return postDoc("letters", { ...letter, fileURL: downloadURL })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["letters"],
      })
    },
  })
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

  return useMutation({
    mutationFn: (transaction) => postDoc("transactions", transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      })
    },
  })
}

const useSignIn = () => {
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: ({ email, password }) => signIn(email, password),
  })
}

//Creates the user doc on creation
const useCreateUser = () => {
  const { createUser } = useAuth()

  return useMutation({
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

  return useMutation({
    mutationFn: (email) => resetPassword(email),
  })
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
