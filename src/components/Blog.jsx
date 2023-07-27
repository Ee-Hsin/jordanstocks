import { useParams } from "react-router-dom"

export const Blog = () => {
  const { blogId } = useParams()

  return <div>Singular Blog, id is {blogId}</div>
}
