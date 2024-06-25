import React from "react"
import { usePostTransactions } from "../../hooks/query"
import { useForm } from "react-hook-form"
import { Loader } from "../UI/Loader"
import { SuccessModal } from "../UI/SuccessModal"
import { FailureModal } from "../UI/FailureModal"
import { checkSpecialChars } from "../usefulFunctions/usefulFunctions"

export const UpdateTransactions: React.FC = () => {
  const mutation = usePostTransactions()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  return <div>Update Transactions</div>
}
