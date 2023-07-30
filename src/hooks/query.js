import { useQuery, useMutation } from "@tanstack/react-query"
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
  return useMutation({
    mutationFn: (stock) => postDoc("portfolio", stock, stock.ticker),
  })
}

export { useGetBlogPosts, usePostEmailList, usePostPortfolio }
