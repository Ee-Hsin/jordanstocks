import { BlogPreviewCard } from "../components/Blog/BlogPreviewCard"
import { SubscribeBlogComponent } from "../components/Blog/SubscribeBlogComponent"
import { Loader } from "../components/UI/Loader"
import { useGetBlogPosts } from "../hooks/query"

export const BlogPage = () => {
  const { isLoading, isError, isSuccess, data, error } = useGetBlogPosts()

  return (
    <section className="pb-20 pt-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
          <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
            Latest blog posts
          </h1>
          <p className="text-gray-600">
            Keep up to date with our latest investment ideas
          </p>
          <SubscribeBlogComponent variant="blog" />
        </div>
        <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {isError && <h1>Error: {JSON.stringify(error)}</h1>}
          {isSuccess &&
            data.docs.map((post) => (
              <BlogPreviewCard
                key={post.id}
                id={post.id}
                img={post.data().img}
                title={post.data().title}
                date={post.data().date}
                description={post.data().description}
              />
            ))}
        </ul>
      </div>
      {isLoading && <Loader />}
    </section>
  )
}
