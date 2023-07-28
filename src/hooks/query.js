import { useQuery } from "@tanstack/react-query"
import { getCollection } from "../hooks/firestore"

const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => getCollection("blogPosts"),
  })
}

export { useBlogPosts }
