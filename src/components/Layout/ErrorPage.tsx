import { useRouteError, Link } from "react-router-dom"

interface RouteError {
  statusText?: string
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError | null // Cast to the type defined above
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error ? error.statusText || error.message : "Unknown Error"}</i>
      </p>
      <Link to="/">Click here to GO back to the main page</Link>
    </div>
  )
}
