import { usePostLetters } from "../../hooks/query"
import { useForm } from "react-hook-form"
import { FailureModal } from "../UI/FailureModal"
import { SuccessModal } from "../UI/SuccessModal"
import { Loader } from "../UI/Loader"
import { checkForNoHTML } from "../usefulFunctions/usefulFunctions"
import { useState } from "react"

export const AddLetters = () => {
  const [fileToUpload, setFileToUpload] = useState({})

  const mutation = usePostLetters()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const handleAddLetter = (data, e) => {
    e.preventDefault()

    // Convert the string date to a JavaScript Object and add the file we upload
    mutation.mutate({ ...data, date: new Date(data.date), file: fileToUpload })
    // Resets the form
    reset()
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="mt-12 max-w-lg mx-auto">
        <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto my-5">
          <h1 className="text-indigo-600 text-3xl font-extrabold sm:text-4xl">
            Add Letters
          </h1>
        </div>
        <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
          {mutation.isError && (
            <FailureModal subMessage={mutation.error.message} />
          )}
          {mutation.isSuccess && <SuccessModal subMessage="Letter Added!" />}
          {mutation.isLoading ? (
            <Loader />
          ) : (
            <form className="py-5" onSubmit={handleSubmit(handleAddLetter)}>
              <div className="mb-6">
                <label className="font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...register("title", {
                    required: true,
                    maxLength: 250,
                    validate: (companyName) => checkForNoHTML(companyName),
                  })}
                />
                {errors.title?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Title is required
                  </p>
                )}
                {errors.title?.type === "maxLength" && (
                  <p role="alert" className="text-red-500">
                    Title cannot exceed 250 characters
                  </p>
                )}
                {errors.title?.type === "validate" && (
                  <p role="alert" className="text-red-500">
                    {"Title cannot contain HTML, < or > "}
                  </p>
                )}
                <label className="font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...register("date", {
                    required: true,
                  })}
                />
                {errors.title?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Date is required
                  </p>
                )}
                <label className="font-medium">File</label>
                <input
                  type="file"
                  name="file"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={({ target: { files } }) => {
                    setFileToUpload(files[0])
                  }}
                  //   {...register("file", {
                  //     required: true,
                  //   })}
                />
                {/* {errors.file?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    A File is required
                  </p>
                )} */}
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
