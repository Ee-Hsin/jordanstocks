import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { Loader } from "../UI/Loader"
import { useSignIn } from "../../hooks/query"
import { useForm } from "react-hook-form"

export const SignIn = () => {
  const { user } = useAuth()
  const mutation = useSignIn()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data, e) => {
    e.preventDefault()
    //Ensure user can't sign in when already signed in
    if (user) return
    mutation.mutate(data)
    reset()
  }

  //Navigates to portfolio page when user is signed in
  if (mutation.isSuccess) return <Navigate to="/portfolio" />

  // Protects form for when User is alr signed in
  if (user) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            You are already Logged in!
          </h2>
        </div>
      </div>
    )
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
          Sign In
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {mutation.isLoading ? (
          <Loader />
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("email", { required: "Email is required" })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p role="alert" className="text-red-500">
                    {errors.email.message}
                  </p>
                )}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password is at least 6 characters long",
                    },
                  })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p role="alert" className="text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {mutation.isError && (
              <p className="text-red-400">
                Your username or password is incorrect
              </p>
            )}
            <div className="text-sm">
              <Link
                to="/forgotPassword"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        <p className="mt-10 text-center text-sm text-gray-800">
          Not a Registered User?{" "}
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
