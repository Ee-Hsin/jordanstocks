import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"

const getCollection = (collectionName) => {
  return getDocs(collection(db, collectionName))
}

export { getCollection }
