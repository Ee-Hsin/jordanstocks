import { useForm } from "react-hook-form"
import { useCreateUser } from "../../hooks/query"
import { FailureModal } from "../UI/FailureModal"
import { Loader } from "../UI/Loader"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"

export const SignUp = () => {
  const mutation = useCreateUser()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data, e) => {
    e.preventDefault()
    //Don't allow submit if there is a user
    if (user) return
    mutation.mutate(data)
    reset()
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {mutation.isError && (
        <FailureModal
          mainMessage="Oops, looks like something went wrong."
          subMessage={mutation.error.message}
        />
      )}
      {mutation.isSuccess && <Navigate to="/portfolio" />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Partner Sign Up
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
                  {...register("email", {
                    required: "An email is required",
                  })}
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
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at lest 6 characters",
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
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
