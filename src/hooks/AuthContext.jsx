import { createContext, useContext, useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { onSnapshot, doc } from "firebase/firestore"
import { auth, db } from "../firebase"

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        // console.log("Current User", currUser)
        setUser(currUser)
      } else {
        // console.log("No more current User")
        setUser()
      }
    })

    return () => unsubscribe()
  }, [])

  //Attaches the user document to listen for changes in the document
  useEffect(() => {
    //Ensures user is signed in
    if (user?.uid) {
      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (userDoc) => {
        setUserDetails({ ...userDoc.data(), uid: user.uid })
        console.log({ ...userDoc.data(), uid: user.uid })
      })

      return () => unsubscribe()
    } else {
      //Empty userDetails
      console.log("bruh")
      setUserDetails()
    }
  }, [user])

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    return signOut(auth)
  }

  return (
    <UserContext.Provider
      value={{ createUser, signIn, resetPassword, user, userDetails, logOut }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(UserContext)
}
