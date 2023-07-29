import { useParams } from "react-router-dom"

export const SingleBlog = () => {
  const { blogId } = useParams()

  return <div>Singular Blog, id is {blogId}</div>
}
