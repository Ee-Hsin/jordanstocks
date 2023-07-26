import { useRef } from "react"
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export const Login = () => {
  const emailRef = useRef()
  const pswRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    // TODO: Add some verification for Email to ensure it is proper
    // TODO: Add some rules for Password such as Minimum length

    //TODO: Add some UI feedback for if email/password is not up to standard

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      pswRef.current.value
    )
      .then((userCredential) => {
        console.log(userCredential)
        emailRef.current.value = ""
        pswRef.current.value = ""
        //TODO: Redirect to a different page (set it to strategy for now)
      })
      .catch((err) => {
        console.log(err)
        //TODO: Add some UI changes for if there was an error when signing in
        // Display: wrong email or Password.
      })
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Partner Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                ref={emailRef}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                ref={pswRef}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* TODO: Add Forgot Password functionality */}
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-800">
          Not a Partner?{" "}
          <Link
            to="/contact"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Contact Us
          </Link>{" "}
          for more information
        </p>
      </div>
    </div>
  )

  //   return (
  //     <div className="flex flex-col w-[250px] my-5 mx-auto text-center">
  //       <form onSubmit={handleSubmit}>
  //         <h1 className="text-3xl mb-2">Partner Login</h1>
  //         <input
  //           type="email"
  //           ref={emailRef}
  //           placeholder="Email"
  //           className="mb-2"
  //         ></input>
  //         <input
  //           type="password"
  //           ref={pswRef}
  //           placeholder="Password"
  //           className="mb-2"
  //         ></input>
  //         <br />
  //         <button type="submit">Login</button>
  //         <p>
  //           For non-partners, please{" "}
  //           <Link to="/contact" className="font-extrabold">
  //             contact us
  //           </Link>{" "}
  //           if you or your organization is interested in investing
  //         </p>
  //       </form>
  //     </div>
  //   )
}
