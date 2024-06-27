import { usePostLetters } from "../../hooks/query"
import { useForm, SubmitHandler } from "react-hook-form"
import { FailureModal } from "../UI/FailureModal"
import { SuccessModal } from "../UI/SuccessModal"
import { Loader } from "../UI/Loader"
import { checkForNoHTML } from "../usefulFunctions/usefulFunctions"
import { useState } from "react"
import { ModifiedLetter } from "../../types/modelTypes"
import { Timestamp } from "firebase/firestore";

//To address:
//file handling
//date handling especially with timestamp and confusion on how I used to upload the date
//and why/how it got converted into a timestamp in the backend. Also where did
//the Timestamp function come from?
//

export const AddLetters = () => {
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)

  const mutation = usePostLetters()

  interface FormInputs {
    title: string
    date: string // will be converted to Date or Timestamp before submitting
    file: FileList
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<FormInputs>()

  const handleAddLetter: SubmitHandler<FormInputs> = (data) => {
    if (!fileToUpload) {
      setError("file", { type: "required", message: "A File is required" })
      return
    }

    // Clear previous file errors if any
    clearErrors("file")

    const letterData: ModifiedLetter = {
      title: data.title,
      date: Timestamp.fromDate(new Date(data.date)), // Convert string date to Timestamp if using Firebase
      file: fileToUpload,
    }

    // Convert the string date to a JavaScript Object and add the file we upload
    mutation.mutate(letterData)
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
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={({ target: { files } }) => {
                    if (files && files[0]) {
                      setFileToUpload(files[0])
                    } else {
                      setFileToUpload(null)
                    }
                  }}
                  // Registering file in useForm is optional as it's being handled via state
                />
                {errors.file && (
                  <p role="alert" className="text-red-500">
                    {errors.file.message}
                  </p>
                )}
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
