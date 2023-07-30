import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getCollection,
  getFirestoreTimestamp,
  postDoc,
} from "../hooks/firestore"

const useFetchBlogPosts = () => {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => getCollection("blogPosts"),
  })
}

const useSendEmailList = () => {
  return useMutation({
    mutationFn: (email) =>
      postDoc(
        "emailList",
        { subscribedAt: getFirestoreTimestamp(), email: email },
        email
      ),
  })
}

export { useFetchBlogPosts, useSendEmailList }
