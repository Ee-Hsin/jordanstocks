import emailjs from "@emailjs/browser"
import { useState } from "react"
import { SuccessModal } from "../UI/SuccessModal"
import { FailureModal } from "../UI/FailureModal"
import { useForm } from "react-hook-form"
import { Loader } from "../UI/Loader"

export const ContactUsForm = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openFailureModal, setOpenFailureModal] = useState(false)
  const [loading, setLoading] = useState(false)

  /* 这是一个蜜罐 */
  const [address, setAddress] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data, e) => {
    // console.log(e)
    // console.log(data)
    setLoading(true)
    //Resetting them just in case the user submitted more than 1 form in a row without
    //refreshing the page (meaning )
    setOpenSuccessModal(false)
    setOpenFailureModal(false)

    /* 这是一个蜜罐 */
    if (address) {
      setTimeout(() => {
        setLoading(false)
        setOpenSuccessModal(true)
        reset()
      }, 1000)
      return
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target, //Have to use e.target as opposed to data since emailJs sendForm method requires a HTMLFormElement or query selector. In this case, e.targeti a HTMLFormElement, data is neither.
        import.meta.env.VITE_API_PUBLIC_KEY
      )
      .then(() => {
        // console.log(result.text)
        setLoading(false)
        setOpenSuccessModal(true)
      })
      .catch(() => {
        // console.log(error.text)
        setLoading(false)
        setOpenFailureModal(true)
      })

    reset()
  }

  return (
    <main className="py-7">
      {openSuccessModal && (
        <SuccessModal
          mainMessage={"Form Submitted!"}
          subMessage={"We'll get back to you within 3-5 working days"}
        />
      )}
      {openFailureModal && <FailureModal />}
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-indigo-600 font-semibold">Contact Me</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Get in touch
            </p>
            <p>
              Have any questions? Please
              fill out the form below, and {"I'll"} get back to you within 3-5
              working days.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  {/* 这是一个蜜罐 */}
                  <label className="font-medium absolute left-[-9999px]">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    tabIndex="-1"
                    autoComplete="new-password"
                    className="text-3xl absolute left-[-9999px]"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label className="font-medium">First name</label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                      maxLength: 50,
                    })}
                    type="text"
                    name="firstName"
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  {errors.firstName?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      First name is required
                    </p>
                  )}
                  {errors.firstName?.type === "maxLength" && (
                    <p role="alert" className="text-red-500">
                      First Name should not exceed 50 characters
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-medium">Last name</label>
                  <input
                    {...register("lastName", { maxLength: 50 })}
                    type="text"
                    name="lastName"
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  {errors.lastName?.type === "maxLength" && (
                    <p role="alert" className="text-red-500">
                      Last Name should not exceed 50 characters
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  {...register("email", { required: true, maxLength: 75 })}
                  type="email"
                  name="email"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Email is required
                  </p>
                )}
                {errors.email?.type === "maxLength" && (
                  <p role="alert" className="text-red-500">
                    Email should not exceed 75 characters
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium">Message</label>
                <textarea
                  {...register("message", { required: true, maxLength: 2000 })}
                  name="message"
                  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                ></textarea>
                {errors.message?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    A brief message is required
                  </p>
                )}
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
