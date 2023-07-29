import emailjs from "@emailjs/browser"
import { useState } from "react"
import { SuccessModal } from "../UI/SuccessModal"
import { FailureModal } from "../UI/FailureModal"

export const ContactUsForm = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openFailureModal, setOpenFailureModal] = useState(false)

  const handleSubmitForm = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_API_PUBLIC_KEY
      )
      .then((result) => {
        console.log(result.text)
        setOpenSuccessModal(true)
      })
      .catch((error) => {
        console.log(error.text)
        setOpenFailureModal(true)
      })

    e.target.reset()
  }

  return (
    <main className="py-14">
      <SuccessModal
        openSuccessModal={openSuccessModal}
        setOpenSuccessModal={setOpenSuccessModal}
        mainMessage={"Form Submitted!"}
        subMessage={"We'll get back to you within 3-5 working days"}
      />
      <FailureModal
        openFailureModal={openFailureModal}
        setOpenFailureModal={setOpenFailureModal}
      />
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">Contact Us</h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Get in touch
          </p>
          <p>
            Interested in becoming a partner, or have any questions? Please fill
            out the form below, and {"we'll"} get back to you within 3-5 working
            days.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmitForm} className="space-y-5">
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">First name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="senderEmail"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Message</label>
              <textarea
                required
                name="message"
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
