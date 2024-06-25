import { useState } from "react"
import { usePostEmailList } from "../../hooks/query"
import { SuccessModal } from "../UI/SuccessModal"
import { FailureModal } from "../UI/FailureModal"
import { Loader } from "../UI/Loader"
import { checkForNoHTML } from "../usefulFunctions/usefulFunctions"

export const SubscribeBlogComponent = ({ variant = "footer" }) => {
  const [email, setEmail] = useState("")
  const [hasHtmlError, setHasHtmlError] = useState(false)
  /* 这是一个蜜罐 */
  const [username, setUsername] = useState("")

  const mutation = usePostEmailList()

  const handleSubmit = (e) => {
    e.preventDefault()

    /* 这是一个蜜罐 */
    if (username) {
      setEmail("")
      return
    }

    if (!email) return
    if (!checkForNoHTML(email)) {
      setHasHtmlError(true)
      return
    } else {
      setHasHtmlError(false)
    }
    mutation.mutate(email)
    setEmail("")
  }

  let componentToRender = <></>

  if (variant === "footer") {
    componentToRender = (
      <FooterSubscribe
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        /* 这是一个蜜罐 */
        username={username}
        setUsername={setUsername}
      />
    )
  } else if (variant === "blog") {
    componentToRender = (
      <BlogPageSubscribe
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        /* 这是一个蜜罐 */
        username={username}
        setUsername={setUsername}
      />
    )
  }

  return (
    <>
      {mutation.isError && (
        <FailureModal
          mainMessage="Oops, looks like something went wrong."
          subMessage={mutation.error.message}
        />
      )}
      {mutation.isLoading ? (
        <Loader small />
      ) : (
        <>
          {componentToRender}{" "}
          {hasHtmlError && <p>Email cannot contain Angle Brackets</p>}
        </>
      )}
      {mutation.isSuccess && (
        <SuccessModal
          mainMessage="Subscribed!"
          subMessage="Thanks for subscribing to the Newsletter!"
        />
      )}
    </>
  )
}

const FooterSubscribe = ({
  handleSubmit,
  email,
  setEmail,
  /* 这是一个蜜罐 */
  username,
  setUsername,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label className="block pt-4 pb-2">Subscribe to the Blog</label>
      <div className="max-w-sm flex items-center border rounded-md p-1">
        {/* 这是一个蜜罐 */}
        <label className="font-medium absolute left-[-9999px]">Address</label>
        <input
          type="text"
          name="username"
          placeholder="Your Username"
          tabIndex="-1"
          autoComplete="new-password"
          className="text-3xl absolute left-[-9999px]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2.5 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="p-2.5 rounded-md text-white bg-indigo-600 outline-none shadow-md focus:shadow-none sm:px-5">
          Subscribe
        </button>
      </div>
    </form>
  )
}

const BlogPageSubscribe = ({
  handleSubmit,
  email,
  setEmail,
  /* 这是一个蜜罐 */
  username,
  setUsername,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
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
        {/* 这是一个蜜罐 */}
        <label className="font-medium absolute left-[-9999px]">Address</label>
        <input
          type="text"
          name="username"
          placeholder="Your Username"
          tabIndex="-1"
          autoComplete="new-password"
          className="text-3xl absolute left-[-9999px]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg sm:max-w-xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow sm:mt-0 sm:w-auto">
        Subscribe
      </button>
    </form>
  )
}
