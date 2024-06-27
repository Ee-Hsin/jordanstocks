import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const TextEditor: React.FC = () => {
  const [value, setValue] = useState("")

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
    />
  )
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      {},
    ],
    [{ align: [false, "center", "right"] }], // custom dropdown
    ["link", "image"],
    ["clean"],
  ],
}
