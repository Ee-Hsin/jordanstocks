// import { Link } from "react-router-dom"
// import { useState } from "react"
import { useMediaPredicate } from "react-media-hook"

export const LettersNavBar = () => {
  // Use this to turn the sidenav into a regular nav.
  const mediumAndAbove = useMediaPredicate("(min-width: 768px)")

  return (
    <div>
      {!mediumAndAbove ? (
        <div>Put a header Navbar here</div>
      ) : (
        <div>Put a Sidebar here</div>
      )}
    </div>
  )
}
