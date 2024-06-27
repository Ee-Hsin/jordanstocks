import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App" // Assuming App is in the same directory
import "./index.css"
import { ThemeProvider } from "@material-tailwind/react"
import { AuthContextProvider } from "./hooks/AuthContext" // Assuming AuthContext is in the hooks directory

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)