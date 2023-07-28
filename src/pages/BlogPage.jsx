import { BlogPreviewCard } from "../components/BlogPreviewCard"
import { Loader } from "../components/Loader"
import { useBlogPosts } from "../hooks/query"

export const BlogPage = () => {
  const { isLoading, isError, isSuccess, data, error } = useBlogPosts()

  return (
    <section className="pb-32 pt-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
          <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
            Latest blog posts
          </h1>
          <p className="text-gray-600">
            Keep up to date with our latest investment ideas
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="items-center justify-center gap-3 sm:flex"
          >
            <div className="relative">
              <svg
                className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg sm:max-w-xs"
              />
            </div>
            <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow sm:mt-0 sm:w-auto">
              Subscribe
            </button>
          </form>
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
