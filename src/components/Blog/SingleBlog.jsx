import { useParams } from "react-router-dom"
import { Loader } from "../UI/Loader"
import { useEffect, useState } from "react"
import { useBlogPosts } from "../../hooks/query"

export const SingleBlog = () => {
  const { blogId } = useParams()
  const { isLoading, isError, isSuccess, data, error } = useBlogPosts()
  const [contents, setContents] = useState({})

  useEffect(() => {
    if (isSuccess) {
      data.forEach((doc) => {
        if (doc.id === blogId) {
          setContents(doc.data())
        }
      })
    }
  }, [isSuccess, data, blogId])

  return (
    <div className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {isError && <h1>Error: {JSON.stringify(error)}</h1>}
        {isLoading && <Loader />}
        {isSuccess && data && (
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
