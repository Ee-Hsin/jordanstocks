import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import {
  getCollection,
  getFirestoreTimestamp,
  postDoc,
  uploadToStorage,
} from "../hooks/firestore"

const useGetBlogPosts = () => {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => getCollection("blogPosts"),
  })
}

const useGetPortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getCollection("portfolio", ["value", "desc"]),
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
    mutationFn: (letter) => {
      //Must call a function to upload letter to firestore, which returns the downloadURL

      // Will need to wait for the storage return...
      uploadToStorage(`letters/${letter.title}`, letter.file)

      // We remove the file (don't upload that to fireStore)
      delete letter.file
      // So we are uploading Title and Date, the fileURL will be added from the backend!
      return postDoc("letters", letter)
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

  return useMutation({
    mutationFn: (stock) => postDoc("portfolio", stock, stock.ticker),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["portfolio"],
      })
    },
  })
}

export {
  useGetBlogPosts,
  useGetPortfolio,
  usePostEmailList,
  usePostLetters,
  usePostPortfolio,
}
