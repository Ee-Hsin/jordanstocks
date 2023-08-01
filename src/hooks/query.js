import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import {
  getCollection,
  getFirestoreTimestamp,
  postDoc,
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
      postDoc(
        "emailList",
        { subscribedAt: getFirestoreTimestamp(), email: email },
        email
      ),
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

export { useGetBlogPosts, useGetPortfolio, usePostEmailList, usePostPortfolio }
