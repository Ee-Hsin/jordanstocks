import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  User,
  UserCredential
} from "firebase/auth"
import { onSnapshot, doc, DocumentData } from "firebase/firestore"
import { auth, db } from "../firebase"

interface UserDetails extends DocumentData {
  uid: string
}

interface AuthContextType {
  user: User | null;
  userDetails: UserDetails | null;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode
}

const UserContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        // console.log("Current User", currUser)
        setUser(currUser)
      } else {
        // console.log("No more current User")
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  //Attaches the user document to listen for changes in the document
  useEffect(() => {
    //Ensures user is signed in
    if (user?.uid) {
      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (userDoc) => {
        setUserDetails({ ...userDoc.data(), uid: user.uid } as UserDetails)
        console.log({ ...userDoc.data(), uid: user.uid })
      })

      return () => unsubscribe()
    } else {
      //Empties userDetails when logout
      setUserDetails(null)
    }
  }, [user])

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const resetPassword = (email: string) => {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider")
  }
  return context
}
