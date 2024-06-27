import { useParams } from "react-router-dom"
import { Loader } from "../UI/Loader"
import { useEffect, useState } from "react"
import { useGetBlogPosts } from "../../hooks/query"
import { BlogPost } from "../../types/modelTypes"

export const SingleBlog: React.FC = () => {
  const { blogId } = useParams<"blogId">()
  const { isLoading, isError, isSuccess, data, error } = useGetBlogPosts()
  const [contents, setContents] = useState<BlogPost | null>(null)

  useEffect(() => {
    // Directly find the blog post with the given id
    const foundPost = data?.find((post) => post.id === blogId)
    if (foundPost) {
      setContents(foundPost)
    }
  }, [data, blogId]) // React on data or blogId changes

  return (
    <div className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {isError && <h1>Error: {JSON.stringify(error)}</h1>}
        {isLoading && <Loader />}
        {isSuccess && contents && (
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="my-3 text-gray-800 text-3xl font-semibold sm:text-4xl">
              {contents.title}
            </h3>
            <img
              src={contents.img}
              loading="lazy"
              alt={contents.title}
              className="w-full md:w-[480px] md:h-[300px] rounded-lg mx-auto my-6"
            />
            {contents?.content?.map((con, index) => (
              <p className="text-gray-600 mt-3 text-left" key={index}>
                {con}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
