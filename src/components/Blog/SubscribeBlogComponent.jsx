import { useState, useEffect } from "react"
import { usePostEmailList } from "../../hooks/query"
import { SuccessModal } from "../UI/SuccessModal"
import { FailureModal } from "../UI/FailureModal"
import { Loader } from "../UI/Loader"

export const SubscribeBlogComponent = ({ variant = "footer" }) => {
  const [email, setEmail] = useState("")
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openFailureModal, setOpenFailureModal] = useState(false)
  const mutation = usePostEmailList()

  useEffect(() => {
    if (mutation.status === "error") {
      setOpenFailureModal(true)
    } else if (mutation.status === "success") {
      setOpenSuccessModal(true)
    } else {
      setOpenFailureModal(false)
      setOpenSuccessModal(false)
    }
  }, [mutation.status])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
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
      />
    )
  } else if (variant === "blog") {
    componentToRender = (
      <BlogPageSubscribe
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
      />
    )
  }

  return (
    <>
      {mutation.isError && (
        <FailureModal
          openFailureModal={openFailureModal}
          setOpenFailureModal={setOpenFailureModal}
          mainMessage="Oops, looks like something went wrong."
        />
      )}
      {mutation.isLoading ? <Loader small /> : componentToRender}
      {mutation.isSuccess && (
        <SuccessModal
          openSuccessModal={openSuccessModal}
          setOpenSuccessModal={setOpenSuccessModal}
          mainMessage="Subscribed!"
          subMessage="Thanks for subscribing to our Newsletter!"
        />
      )}
    </>
  )
}

const FooterSubscribe = ({ handleSubmit, email, setEmail }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label className="block pt-4 pb-2">Subscribe to our Blog</label>
      <div className="max-w-sm flex items-center border rounded-md p-1">
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

const BlogPageSubscribe = ({ handleSubmit, email, setEmail }) => {
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
